import express from "express";
const app=express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cloudinary from "cloudinary"
import cors from "cors"
dotenv.config();
import authRoute from "./routes/auth.js";
// import userRoute from "./routes/users.js";
import productRoute from "./routes/product.js"

app.use(express.json());
app.use(morgan("common"))

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }));

async function mongoDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connect")
    } catch (error) {
        console.log('database connection is failed!',error)
    }

}
mongoDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    
})


app.use('/api/auth',authRoute)
// app.use('/api/user',userRoute)
app.use("/api/product",productRoute)

const PORT=5004
app.listen(PORT,()=>{
    console.log(`server on http://localhost:${PORT}`)
})