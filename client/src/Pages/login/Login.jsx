import React, { useRef, useState } from 'react'
import './login.css'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../../redux/apiCall'

export function Login(props) {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const { isFetching,error} = useSelector((state)=>state.user);
     

    const handleClick=(e)=>{
        e.preventDefault();
       login(dispatch,{username,password});
    };
    return (
        <div className="login">
        <form className="loginform" >
            <h1 className="loginTitle">Login</h1>

            <label className='loginlabel' htmlFor="username">Username</label>
            <input className='LoginInput' type="username" onChange={(e)=>setUsername(e.target.value)} id='username' placeholder='username...' />

            <label className='loginlabel' htmlFor="password">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} className='LoginInput' type="password" id='password' />
           
             <button className='loginbtn' disabled={isFetching} onClick={handleClick} >Login</button>
        </form>
        </div>
    )
}
