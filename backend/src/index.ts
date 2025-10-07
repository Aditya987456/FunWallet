import express from 'express'
import cors from 'cors'
import { ConnectDB } from './db'
import dotenv from 'dotenv'
import { router } from './routes'
dotenv.config()

const port = process.env.PORT || 5000;
const app=express()
app.use(cors());
app.use(express.json());


app.use('/api/v1',router)

ConnectDB();






app.listen(port, ()=>{
    console.log('Server running on the port :'+port)
})