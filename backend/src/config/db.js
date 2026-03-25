import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async()=>{
    try{
         await mongoose.connect(ENV.MONGO_URI)
         console.log("Database Connected")
    } catch (error) {
         console.log('error from connectDB ,${error}')
    }
}