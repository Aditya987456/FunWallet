import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config"
import { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'



export const UserMiddleware = (req:Request, res:Response, next:NextFunction)=>{

    const header=req.headers.authorization
    console.log("header-----------------"+header)
    //if(!header || !header.startsWith('Bearer')){
    if(!header){
        return res.status(403).json({
            message:'Invalid header saar.'
        })
    }

    //const token = header.split(" ")[1]    //since header is - bearer bd887398798h4rrc like this...
    const token = header
    //now verify token..
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET)as JwtPayload;  //using payload solves problem decodedtoken.id wala.
        //@ts-ignore
        req.userId=decodedToken.id
        next()

    } catch (error) {
        return res.status(403).json({
            message:'invalid token --> unknown access.'
        })
    }

}