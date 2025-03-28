import React from 'react'
import  { ArrowDropDown, Search, ShoppingCart}  from '@mui/icons-material'
import './navbar.css'
import {useSelector} from 'react-redux'
import { Link, useLocation } from 'react-router-dom'


export function Navbar(props) {
    const { data, isloggedIn, role } = useSelector((state) => state?.auth);
    console.log("User Data:", data);
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
                 
                    
                </div>
            </div>
        </div>
    )
}
