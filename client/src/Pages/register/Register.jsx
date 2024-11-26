import React, { useState } from 'react'
import './register.css'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/regapicall';

export function Register(props) {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const dispatch=useDispatch();
  const { isFetching,error} = useSelector((state)=>state.user);


    const handleClick=(e)=>{
      e.preventDefault();
     register(dispatch,{username,email,password});
  };
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
     
      <form className="registerForm">
        <label>Username</label>
        <input 
           onChange={(e)=>setUsername(e.target.value)} 
          className="registerInput" 
          type="text" 
          placeholder="Enter your username..." 
          required 
        />
        <label>Email</label>
        <input 
          className="registerInput" 
          type="email" 
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter your email..." 
          required 
        />
        <label>Password</label>
        <input 
          onChange={(e)=>setPassword(e.target.value)}
          className="registerInput" 
          type="password" 
          placeholder="Enter your password..." 
          required 
        />
        <button disabled={isFetching} onClick={handleClick} className="registerButton" type="submit" >
          Submit
        </button>
      </form>
      
    </div>
    )
}
