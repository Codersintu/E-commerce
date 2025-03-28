import React, { useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { createAccount } from '../../redux/AuthSlice.js';
import { isEmailValid,isValidPassword } from '../../helper/error.js';
import './register.css'

export function Register(props) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [previewImage,setPreviewImage]=useState("");

    const [signupData,setSignupData]=useState({
        username:"",
        email:"",
        password:"",
        avatar:""
    });

    const handleInputChange=(event)=>{
        const {name,value}=event.target;
        setSignupData({
            ...signupData,
            [name]:value
        })

    }

    const handleImage=(event)=>{
        event.preventDefault();
        //getting the image
        const uploadImage=event.target.files[0];

        if (uploadImage) {
            setSignupData({
                ...signupData,
                avatar: uploadImage
            });
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.onload = () => {
                setPreviewImage(fileReader.result);
              };
            
        }
    }

    const createAccounthandler=async(event)=>{
        event.preventDefault();
        if (!signupData.email || !signupData.username || !signupData.password || !signupData.avatar) {
        toast.error("Please fill all the details");
        return;
        }
        //checking name field length
        if(signupData.username.length < 5){
            toast.error("Name should be atleast of 5 character");
            return;
        }
         
        //checking valid email
        if (!isEmailValid(signupData.email)) {
            toast.error("Invalid email id")
            return;
        }

        //checkingpassword validation
        if (!isValidPassword(signupData.password)) {
            toast.error("password should be 6-16 character long with atleast a number and special character")
        }

        const formData=new FormData();
        formData.append("username",signupData.username);
        formData.append("email",signupData.email);
        formData.append("password",signupData.password);
        formData.append("avatar",signupData.avatar);

        //dispatch create account action
        const response=await dispatch(createAccount(formData));
        if (response?.payload?.success) 
        navigate("/");

        setSignupData({
            username:"",
            email:"",
            password:"",
            avatar:""
        });
        setPreviewImage("");

    }

    return (
        <div className="register">
    <div className="wrapregister">
    <form noValidate onSubmit={createAccounthandler} className="formregister">
      <h1 className="registerTitle">Register Here</h1>

      <label htmlFor="image_upload" className="labelImg">
   {previewImage ? (
        <img
          src={previewImage}
          className="imgavtar"
          style={{ objectPosition: "top center" }}
          alt="Uploaded"
         />
        ) : (
         <BsPersonCircle className=" Img" />
        )}
    </label>
    <input
          onChange={handleImage}
          type="file"
          className="hidden"
          name="image_upload"
          id="image_upload"
          accept=".jpg, .jpeg, .png, .svg"
     />

       <div className="Inputgr">
        <label htmlFor="username" className="">fullName</label>
        <input value={signupData.username} onChange={handleInputChange} type="text" name="username" id="username" required placeholder="Enter your fullName..."
          className=" Inputdetail" />
      </div>


      <div className=" Inputgr">
        <label htmlFor="email" className="">Email</label>
        <input value={signupData.email} onChange={handleInputChange} type="email" name="email" id="email" required placeholder="Enter your email..."
          className=" Inputdetail" />
      </div>



      <div className="Inputgr">
        <label htmlFor="password" className="font-extrabold bg-amber-500 !text-9xl">Password</label>
        <input value={signupData.password} onChange={handleInputChange} type="password" name="password" id="password" required placeholder="Enter your password..."
          className=" Inputdetail" />
      </div>


      <button type='submit' className=" createBtnregister">Create account</button>

      <p className=''>Already have an account ? <Link to='/login' className=''>Login</Link></p>
    </form>
  </div>
</div>

    )
}
