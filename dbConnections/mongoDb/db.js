import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MongoDB_URI = process.env.MONGODB_URI;

export const connectToDB = async () => { 
    try {
        await mongoose.connect(MongoDB_URI);
        console.log("Connection to MongoDB successful.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}