import express from 'express'
import { UserMiddleware } from '../middleware/middleware'
import { accountModel, userModel } from '../db'
import mongoose from 'mongoose'




export const accountRoute=express.Router()


accountRoute.get('/', (req,res)=>{
    res.json({
        message:'hello from ---> /api/v1/account/'
    })
})


//---- route for to get balance-----
accountRoute.get('/balance', UserMiddleware, async (req, res)=>{
    try {
        const account=await accountModel.findOne({
           //@ts-ignore
            userId:req.userId
        }).populate('userId', 'email')

        res.status(200).json({
            message:'Your a/c balanace is : ',
            balance:account?.balance,
            //@ts-ignore
            email: account?.userId?.email
        })
        
    } catch (error) {
        return res.status(403).json({
            message:'Error in getting the balance. Try after sometime'
        })
    }
})




//$$$###################### very important to learn...########################
//----------- route for transfer money. ---------
accountRoute.post('/transfer', UserMiddleware, async (req, res)=>{


    //*****session is context for sequentical operations...--> maintain consistency.
    const session = await mongoose.startSession();






/*  In between if any transaction falls means transaction is aborted and even the half completed
    transaction will roolback   */


//------------------------------------------------------------------------------------------
session.startTransaction();    //here transaction started
    
    try {
        const { amount, receiverId }= req.body

    const SenderAccount = await accountModel.findOne(
        //@ts-ignore
        {userId:req.userId}).session(session)   //$$$$## here .session(session) means this is the part of transaction running in this session.

    if(!SenderAccount){
        throw new Error('Sender not found')
    }
    if(SenderAccount.balance < amount){
        throw new Error('Insufficient balance')
    }


    const ReceiverAccount = await accountModel.findOne({userId:receiverId}).session(session)

    if(!ReceiverAccount){
        throw new Error('Receiver not found || invalid receiver.')
    }


    //after passing all checks like - sender+receiver is there , sufficient balance is there noe do transaction...
    //performing transaction.
    await accountModel.updateOne(    //debit money
        //@ts-ignore
        {userId:req.userId},
        { $inc: { balance: -amount}}
    ).session(session)

    await accountModel.updateOne(    //credit money.
        { userId:receiverId},{
            $inc:{balance:amount}}
    ).session(session)

    await session.commitTransaction() //commit the transaction.
//------------------------------------------------------------------------------------------
    res.status(200).json({
        message:'Transaction successfull.'
    })

} catch (error) {
        await session.abortTransaction()
        return res.status(400).json({
            message:'Transaction aborted...'
        })
    }finally{
        session.endSession()
    }
})
