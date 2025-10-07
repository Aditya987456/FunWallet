import dotenv from 'dotenv'
dotenv.config()


export const JWT_SECRET=process.env.JWT_SECRET!;  //! means bhai baat mano JWT_SECRET empty nahi hai :)
export const MONGODB_URL=process.env.MONGODB_URL;

