import React from 'react'
import './order.css'
import img from '../../assets/ts.webp'
import { Add, Remove } from '@mui/icons-material'
import { Info } from '../../components/info/Info'
import { useSelector } from 'react-redux';

export function Order(props) {
   const carts =useSelector(state=>state.cart);
   console.log("carts:",carts);
  return (
    <div className="order">
       <div className="offer">
          <span className="offerlist">Super Deal! Free Shipping on Orders Over $50</span>
        </div>
        <div className="orderwrapper">
          <h1 className="ordertitle">YOUR BAG</h1>
          <div className="ordersection">
            <div className="shopbtn">
          <button>CONTINUE SHOPPING</button>
          </div>
          <div className="bag">
            <span>Shopping Bag(@)</span>
            <span>Your Wishlist(0)</span>

          </div>
          <div className="check">
            <button>Checkout Now</button>
          </div>
          </div>
          
    
           <div className="orderbill">
           {carts.products && carts.products.length > 0 ? (carts.products.map((product)=>(
            
            <div className="leftbill">
              <div className="proimg">
                <img className='sellimg' src={product.img} alt="" />
                </div>
                <div className="productinfo">
                  <span><b>Product:</b>{product.title}</span>
                  <span><b>ID:</b>{product._id}</span>
                  <span className="gola">{product.color}</span>
                  <span><b>Size:</b>{product.size}</span>
                </div>
                <div className="productprice">
                  <div className="add">
                    <Add />
                    <span>{product.quantity}</span>
                    <Remove/>
                  </div>
                  <span>$ {product.price * product.quantity}</span>
              </div>
            </div>
            
          ))
        ) : (
            <p>No products in the cart.</p>
        )};
        
            <div className="rightbill">
              <div className="rightbillwrapper">
              <h1>ORDER SUMMARY</h1>
              <div className="orderedlist">
              <ul>
                <li>subtotal</li>
                <li>Estimated price</li>
                <li>shipping price</li>
                <li>TOTAL</li>
              </ul>
              <ul>
                <li>{carts.total}</li>
                <li>22$</li>
                <li>33$</li>
                <li>{carts.total}</li>
              </ul>
              </div>
              <div className="checkoutbtn">
                <button>CheckOut Now</button>
              </div>
            </div>
            </div>
           </div>
        </div>
         <div className="locate">
          <Info/>
         </div>
    </div>
  
  );
};

 