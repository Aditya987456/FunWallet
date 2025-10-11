//user router-- api/v1/user all are come here.

import express from 'express'
import { z } from "zod"
import { accountModel, userModel } from '../db';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config';
import { UserMiddleware } from '../middleware/middleware';
const saltRounds=6;
export const userRoute=express.Router();









userRoute.get('/', (req,res)=>{
    res.json({
        message:'response from api/v1/user/ saaaaar'
    })
})



//input validated by zod for signup.
const inputValidate=z.object({
    firstname:z.string(),
    lastname:z.string(),
    email:z.string().email(),
    password:z.string()
})

userRoute.post('/signup', async (req, res)=>{
try {
    //#1: validate input using zod.
    const isInputValid = inputValidate.safeParse(req.body)
    if(!isInputValid.success){
        return res.status(411).json({
            message:"Incorrect input formate."
        })
    }

    const { firstname, lastname, email, password }=req.body;
//console.log(firstname, lastname, email, password)
    //#2:now check is user is uniques or not using email.
    const uniqueUser=await userModel.findOne({email})
    if(uniqueUser){
        return res.status(403).json({
            message:'User already exist.'
        })
    }

    //#3:bcrypt password.
    const hashedpassword=await bcrypt.hash(password, saltRounds )

    //#4: now everything is ok now so store in DB.
    const newUser = await userModel.create({
        firstname,
        lastname,
        email,
        password:hashedpassword
    })



    ///-----------------account created with balance from 1k - 10k.-----------------------
    const userId=newUser._id    //new user ka id for the reference....
    await accountModel.create({
        userId,
        balance:(1 + Math.random())*10000
    })
    ///------------------------------------------------------------------------------------
    


    
    res.status(200).json({
        message:"You have successsfully signed up."
    })

} catch (error:any) {

    if (error.code === 11000) {
        return res.status(409).json({ error: "Username already exists" });
        }

    return res.status(500).json({
        message:'Error in sign up...',
        Error:error
    })
        
   }
})




//input validation using zod for signin.
const inputValidateSignin=z.object({
    email:z.string().email(),
    password:z.string()
})

userRoute.post('/signin', async (req, res)=>{

try {  
    //#1: validate input
    const validateInput = inputValidateSignin.safeParse(req.body)

    const { email, password }=req.body

    //#2:find the user using matching gmail---here gmail is unique.
    const userExist=await userModel.findOne({email})
    if(!userExist){
        return res.status(403).json({
            message:'Invalid emailId.'
        })
    }

    //#3:if user exist now compare password.
    const passwordValid = await bcrypt.compare(password, userExist.password)
    if(!passwordValid){
        return res.status(403).json({
            message:'Incorrect password. Try again'
        })
    }


    //#4: after all ok then jwt signin for the token.
    const token = jwt.sign({id:userExist._id}, JWT_SECRET )  

    res.status(200).json({
        message:'Signin Successfully...',
        token:token,
        firstname:userExist.firstname
    })



} catch (error) {
    return res.status(411).json({
        message:"Error in signing in right now."
    })
}

})





//Route to update user information.---> other than email...
const Updatebody = z.object({
    password:z.string().optional(),
    firstname:z.string().optional(),
    lastname:z.string().optional()
})

userRoute.put('/', UserMiddleware, async (req, res)=>{
try {

    const updateInputValid = Updatebody.safeParse(req.body)
    if(!updateInputValid.success){
        res.status(411).json({
            message:'Error while updating information.'
        })
    }

    const { firstname, lastname, password }=req.body
    //######: for update in mongodb --> expect in object therefore firstly create a update object then
    const updateInputs:any={};  //this is the object...
    if(firstname){
        updateInputs.firstname=firstname;
    }

    if(lastname){
        updateInputs.lastname=lastname;
    }

    if(password){
        const hashedpassword= await bcrypt.hash(password, saltRounds)
        updateInputs.password=hashedpassword
    }

//????? if no field for update then??????

    //now call to db for update.
    await userModel.updateOne(
        //@ts-ignore
        {_id:req.userId},
        {$set:updateInputs}
    )

    res.status(200).json({
        message:'Updated details successfully.'
    })
        
} catch (error) {
        return res.status(500).json({
            message:'Error in updating details.'
        })
    }

    

})




//######### important thing to learn---
//Route to get users from backend, via firstname or lastname.

userRoute.get('/bulk', UserMiddleware, async (req, res)=>{
    const filter = req.query.filter;
    try {
        const users = await userModel.find({
        $or: [ //for or in mongodb.
        { firstname: { $regex: filter, $options: "i" } },  //i for searching case sensitive also.
        { lastname: { $regex: filter, $options: "i" } }
      ]
    })
     res.json({         //output in systematic manner.
        user:users.map(EachUser=>({
            email:EachUser.email,
            firstname:EachUser.firstname,
            lastname:EachUser.lastname,
            _id:EachUser._id
        }))
     })
        
    } catch (error) {
        return res.status(403).json({
            message:'Error in searching.'
        })
    }
})









