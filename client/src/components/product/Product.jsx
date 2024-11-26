import React from 'react'
import './product.css'
import {  FavoriteBorderOutlined, Search, ShoppingCartOutlined } from '@mui/icons-material'
import { useLocation ,Link} from 'react-router-dom'
export function Product({item}) {

    return (
        <div className="product">
            <div className="productwrapper">
                <div className="productimg">
                    <img className='jsimg' src={item.img} alt="" />
                    <div className="Icon">
                        <ShoppingCartOutlined className='ico'/>
                        <Link to={`/products/${item._id}`}>
                        <Search className='ico'/>
                        </Link>
                        <FavoriteBorderOutlined className='ico'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
