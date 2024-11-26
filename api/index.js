const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const morgan = require("morgan");
const cors=require("cors")
dotenv.config();
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const productRoute=require("./routes/product")

app.use(express.json());
app.use(morgan("common"))

app.use(cors({
    origin: "http://localhost:5173", 
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
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use("/api/product",productRoute)

const PORT=5004
app.listen(PORT,()=>{
    console.log(`server on http://localhost:${PORT}`)
})