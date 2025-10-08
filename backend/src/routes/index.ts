import express from 'express'

export const router=express.Router();
import { userRoute } from './user';
import { accountRoute } from './account';


router.get('/', (req,res)=>{
    console.log('router working fine saaar.-api/v1/')
    res.json({
        message:'hello from route - api/v1/'
    })
})


router.use('/user', userRoute )   //api/v1/user/.....
router.use('/account', accountRoute)           //api/v1/account/....