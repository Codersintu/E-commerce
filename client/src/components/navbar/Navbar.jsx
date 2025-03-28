import React from 'react'
import  { ArrowDropDown, Search, ShoppingCart}  from '@mui/icons-material'
import './navbar.css'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Logout } from '../../redux/AuthSlice'


export function Navbar(props) {
    const dispatch=useDispatch();
  const navigate=useNavigate();
    const { data, isloggedIn, role } = useSelector((state) => state?.auth);
    console.log("User Data:", data);

    const handleLogout=async(event)=>{
        event.preventDefault();
         const response=await dispatch(Logout());
         console.log('response',response)

           navigate('/register'); 
      }
    return (
        <div className="navbar">
            <div className="navbarwrapper">
                <div className="left">
                    <div className="lang">
                    <span>HIN</span>
                    <ArrowDropDown className='arrowIcon'/>
                    </div>
                    <div className="searchfield">
                    <input type="text" placeholder='...search' className='NavbarInput'/>
                    <Search className='searchIcon'/>
                    </div>
                
                </div>
                <div className="center"><span className='robo'>VMart SHOP</span></div>
                
                <div className="right">
                    {!data ? (
                  <>
                    <Link to='/register'>
                    <span className='regi'>Register</span>
                    </Link>
                    <Link to='/login'>
                    <span className='sign'>Sign In</span>
                    </Link>
                    </>
                ) : (
                 <span>WELCOME {data.username}</span>
                )}
                    <Link to='/order'>
                    <div className="cartfield">
                    
                    <ShoppingCart className='cartIcon'/>
                    <div className="cartnumber">23</div>
                    
                    </div>
                    </Link>
                 
                    <button className='btn-primary !bg-blue-500 px-4 py-1 font-semibold rounded-md w-full'>
                    <Link onClick={handleLogout}>LogOut</Link>
                </button>
                </div>
            </div>
        </div>
    )
}
