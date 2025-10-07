
import mongoose, { Schema } from "mongoose";
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
const userSchema = new Schema({
    firstname:{type:String ,required:true, trim:true},
    lastname:{type:String,trim:true},
    email:{type:String, required:true, trim:true, unique:true},
    password:{type:String, required:true, trim:true}
})
export const userModel = mongoose.model('user', userSchema);
