import React, { useEffect, useState } from 'react'
import './Productlist.css'
import { Add, PlusOne, Remove, SettingsBackupRestoreSharp } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { addProduct } from '../../redux/cartRedux'
import { useDispatch } from 'react-redux'
export function Productlist(props) {
    const location=useLocation()
    const id=location.pathname.split("/")[2];
    const [product,setProduct]=useState({});
    const [quantity,setQuantity]=useState(1);
    const [color,setColor]=useState("null");
    const [size,setSize]=useState("null");
    const dispatch=useDispatch();




    useEffect(()=>{
        const getProduct=async()=>{
            try { 
                const res = await axios.get("http://localhost:5004/api/product/find/" + id)
                setProduct(res.data);
                console.log(res.data);
            } catch (error) {
                res.status(500).json("data fetch failed!");
            }
           
        }
        getProduct();
    },[id]);

    const handleQuantity=(type)=>{
        if (type === "dec") {
            quantity>1 && setQuantity(quantity - 1);
        }else{
            setQuantity(quantity + 1)
        }
    };
    const handleClick=()=>{
      dispatch(addProduct({...product,quantity,color,size}));
    }

    return (
        <div className="productlist">
             <div className="offer">
                <span className="offerlist">Super Deal! Free Shipping on Orders Over $50</span>
            </div>
            <div className="productlistwrapper">
                <div className="leftlist">
                   <img src={product.img} alt="" />
                </div>
                <div className="rightlist">
                     <h1>{product.title}</h1>
                     <p>{product.desc}</p>
                     <p>{product.price}</p>
                     <div className="colors">
                        <div className="cols">
                        <span>color</span>
                     {product.color && product.color.length > 0 ? (
                        product.color.map((c,index) => (
                            <div key={index} className='coloor' style={{ backgroundColor: c}} onClick={()=>setColor(c)}><span>{c}</span></div>
                        ))
                     ):(
                        <p>no color</p>
                     )}
                          

                        </div>
                        <div className="sozo">
                            <span onChange={(e)=>setSize(e.target.value)}>Size</span>
                            {product.size && product.size.length > 0 ? (
                              <select>
                                {product.size.map((s,index) => (
                                  <option key={index} value={s} >{s}</option> 
                                ))}      
                               </select>
                            ):(
                                <p>no size</p>
                            )}
                          
                        </div>

                     </div>
                     <div className="quantity">
                        <div className="quant">
                            <Remove onClick={()=>handleQuantity("dec")}/>
                            <div className="number">
                                <span>{quantity}</span>
                            </div>
                            <Add onClick={()=>handleQuantity("inc")}/>
                        </div>
                        <button className='buybtn' onClick={handleClick}>Add To Cart</button>
                     </div>
                </div>
            </div>
        </div>
    )
}
