import  { Router } from 'express';
const router=Router()
import User from "../module/User.js";
import bcrypt from 'bcrypt'
import  {isLoggedIn}  from '../Auth.js';
import upload from '../multer.js';
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
// import sendEmail from '../utility/sendEmail.js';
// import crypto from 'crypto'

const cookieOption={
    maxAge:7 * 24 * 60 * 60 * 1000, // for 7days,
    httpOnly:true,
    secure:true,
};

//register
router.post('/register',upload.single('avatar'),async(req,res)=>{
    const {username,email,password}=req.body;
 
    if (!username || !email || !password) {
      return res.status(400).json('please fill all credentials!')
    }
 
    const userExist=await User.findOne({email:req.body.email})
 
    if (userExist) {
     return res.status(400).json('email allready exist!')
    }
    const salt=await bcrypt.genSalt(10)
    const hashPasssword=await bcrypt.hash(req.body.password,salt)


try {
const Newuser=await User.create({
    username:req.body.username,
    email:req.body.email,
    password:hashPasssword,
    avatar:{
        public_id:email,
        secure_url:''
    }
    
})
if (!Newuser) {
return res.status(400).json('User registered failed!')
}

//file upload todo
console.log('file detail:',req.file)
if (req.file) {

try {
    const result=await cloudinary.v2.uploader.upload(req.file.path,{
        folder:'lms',
        width:250,
        height:250,
        gravity:"faces",
        crop:"fill"
    });
    
    if (result) {
        Newuser.avatar.public_id=result.public_id;
        Newuser.avatar.secure_url=result.secure_url;

        //remove file from server
       fs.rm(`uploads/${req.file.filename}`)
    }
} catch (error) {
    console.log('errors:',error)
    return res.status(500).json("File not upload, please try again!")
}
}
await Newuser.save();
Newuser.password=undefined;
const token=await Newuser.generateJwtToken();
res.cookie('token',token,cookieOption)

return res.status(201).json({success:true, message:"User registered successfully!", Newuser,token})
} catch (error) {
console.error("Error during registration:", error);
return res.status(500).json('internal error!')
}

})


//login
router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;

        if (!email || !password) {
            return res.status(400).json('email and password are required!')
        }
        const user=await User.findOne({email}).select("+password");
        if (!user || !user.comparePassword(password)) {
            return res.status(400).json('Email and password does not match!')
        }

       
        const token=await user.generateJwtToken();
        user.password=undefined;
        res.cookie('token',token,cookieOption);
        return res.status(201).json({
            success:true,
            message:'user loggedIn successfully',
            user,
            token
        })
    } catch (error) {
        return res.status(500).json('User logged failed!')
    }
   

})

router.delete('/logOut',async(req,res)=>{
    try {
        res.cookie('token',null,{
            secure:true,
            maxAge:0,
            httpOnly:true,
        });
        return res.status(201).json({
            success:true,
            message:"User logout successfully!"
        })
    } catch (error) {
        return res.status(500).json('Invalid LogOut!')
    }
})

export default router;

