
import mongoose, { model, Schema } from "mongoose";
import { MONGODB_URL } from "./config";



//---------------------    db connection    ----------------------
export async function ConnectDB() {
    const url=MONGODB_URL
    if (!url) {
    throw new Error("DB_URL is not defined in .env");
        }

    try {
        await mongoose.connect(url)
        console.log("DB is connected.")
    } catch (error) {
        console.log('Error in connecting to DB.')
    }
    
}



//---------- schema for user.
const userSchema = new mongoose.Schema({
    firstname:{type:String ,required:true, trim:true},
    lastname:{type:String,trim:true},
    email:{type:String, required:true, trim:true, unique:true},
    password:{type:String, required:true, trim:true}
})
export const userModel = mongoose.model('user', userSchema);




//----------- schema for account-----
const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    balance:{ type:Number, required:true }
})
export const accountModel = mongoose.model('account', accountSchema)





//--------------- Schema for the transaction ----------------
const TransactionHistory = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    amount:{type:Number, required:true},
    PaymentType:{type:String, enum: ["add", "receive", "send"], required:true },
    peopleName: { type: String, trim: true }, 
    timestamp: { type: Date, default: Date.now }
})
export const TransactionHistoryModel = mongoose.model('transaction', TransactionHistory)

