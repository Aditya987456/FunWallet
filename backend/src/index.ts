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






// app.listen(port,  ()=>{
//     console.log('Server running on the port :'+port)
// })

//this is for also run on the other device.
app.listen(3000, "0.0.0.0", () => {
  console.log("✅ Backend running on http://192.168.165.33:3000");
});