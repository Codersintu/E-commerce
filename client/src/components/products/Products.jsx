import React, { useEffect, useState } from 'react'
import { popularProducts } from '../../../data'
import { Product } from '../product/Product'
import './products.css'
import axios from 'axios';

export function Products({cat,filters,sort}) {
    const [products,setProducts]=useState([]);
    const [filteredProducts,setFilteredProducts]=useState([]);

    useEffect(()=>{
        const getProduct=async()=>{
            try {
                const res=await axios.get("http://localhost:5004/api/product/")
                setFilteredProducts(res.data);
                console.log(res.data)
            } catch (error) {
                console.log('product fetch failed')
            }
        }
        getProduct();
    },[cat])

    useEffect(()=>{
        cat && 
        setFilteredProducts(products.filter((item)=>
        Object.entries(filters).every(([key,value])=>
        item[key].includes(value)
        )
        ));
    },[products,cat,filters])

    useEffect(()=>{
        if (sort === "newest") {
            setFilteredProducts((products)=>
            [...products].sort((a,b)=>a.createdAt - b.createdAt));
            
        } else if (sort === "asc") {
            setFilteredProducts((prev)=>
            [...prev].sort((a,b)=>b.price - a.price)
            );
        }else {
            setFilteredProducts((prev)=>
            [...prev].sort((a,b) => b.price - a.price)
            )
        }
    },[sort])
    

    return (
        <div className="products">
         { filteredProducts.map((item) =>
            <Product item={item} key={item.id}/>)}
        </div>
    )
}
