import React, { useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { createLogin } from '../../redux/AuthSlice.js';
import './login.css'


export function Login(props) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
   
    const [LoginData,setLoginData]=useState({
        username:"",
        email:"",
        password:"",
        avatar:""
    });

    const handleLoginInputChange=(event)=>{
        const {name,value}=event.target;
        setLoginData({
            ...LoginData,
            [name]:value
        })

    }


    const createLoginhandler=async(event)=>{
        event.preventDefault();
        if (!LoginData.email || !LoginData.password ) {
        toast.error("Please fill all the details");
        return;
        }
       
        //dispatch create account action
        const response=await dispatch(createLogin(LoginData));
        if (response?.payload?.success) 
        navigate("/");

        setLoginData({
            email:"",
            password:"",
        });

    }

    return (
        <div className="login">
    <div className="wraplogin">
    <form noValidate onSubmit={createLoginhandler} className="formlogin">
      <h1 className="">Login Page...</h1>


      <div className="Inputgr">
        <label htmlFor="email" className="font-semibold">Email</label>
        <input value={LoginData.email} onChange={handleLoginInputChange} type="email" name="email" id="email" required placeholder="Enter your email..."
          className="Inputdetail" />
      </div>



      <div className="Inputgr">
        <label htmlFor="password" className="">Password</label>
        <input value={LoginData.password} onChange={handleLoginInputChange} type="password" name="password" id="password" required placeholder="Enter your password..."
          className="Inputdetail" />
      </div>


      <button type='submit' className="createBtnlogin">Login</button>

      <p className='text-center'>Create an account ? <Link to='/register' className=''>Register</Link></p>
    </form>
  </div>
</div>

    )
}
