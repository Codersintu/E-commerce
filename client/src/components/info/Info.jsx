import React from 'react'
import './info.css'
import {Link} from 'react-router-dom'
import { Call, Email, Facebook, Instagram, LocationCity, WhatsApp, YouTube } from '@mui/icons-material'

export function Info(props) {
    

    return (
        <div className="info">
            <div className="infowrapper">
                <div className="part-1">
                    <span className='totle'>ROBO...</span>
                    <p className='para'>amus dolores eos nesciunt molestiae praesentium beatae necessitatibus animi, laboriosam facilis! Perferendis, labore corporis rerum pariatur fugit, placeat totam minus ratione sunt quia deserunt neque fugiat? Est!</p>
                </div>
                <div className="part-2">
                    <span className="totle">Useful Links</span>
                    <div className="table">
                        <ul className='UL'>
                           
                            <li>HOME</li>
                          
                            <li>MAN FASHION</li>
                            <li>ACCESSORIES</li>
                            <Link to='/order'>
                            <li>ORDER TRACKING</li>
                            </Link>
                            <li>WISHIST</li>
                        </ul>
                        <ul>
                            <li>CART</li>
                            <li>WOMAN</li>
                            <li>MYACCOUNT</li>
                            <li>WISHLIST</li>
                            <li>TERMS</li>
                        </ul>
                    </div>
                </div>
                <div className="part-3">
                    <span className='totle'>Contact</span>
                    <div className="detail">
                    <div className="location">
                        <LocationCity/>
                        <p>Begusarai Bihar 851129@</p>
                    </div>
                    <div className="phone">
                        <Call/>
                        +91 9199054163
                    </div>
                    <div className="cont">
                        <Email/>
                        www.skdetly851129@gmail.com
                    </div>
                    <div className="logo">
                        <Facebook/>
                        <Instagram/>
                        <Link to='https://www.youtube.com/@trader_sinturoy'>
                        <YouTube/>
                        </Link>
                        <WhatsApp/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
