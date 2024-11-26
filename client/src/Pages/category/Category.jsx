import React, { useState } from 'react'
import { Products } from '../../components/products/Products'
import './category.css'
import { useLocation } from 'react-router-dom'
import {News} from '../../components/news/News'
import {Info} from '../../components/info/Info'


export function Category(props) {
    const location=useLocation()
    const cat=location.pathname.split("/")[2];
    const [filters,setFilters]=useState({});
    const [sort,setSort]=useState("newest")
    const handlefilter=(e)=>{
        const value=e.target.value;
        setFilters({
            ...filters,
            [e.target.name]:value,
        });
    };
    
    return (
        <div className="category">
            <div className="offer">
                <span className="offerlist">Super Deal! Free Shipping on Orders Over $50</span>
            </div>
            <div className="categorywrapper">
            <div className="h1">Dresses</div>
            <div className="filter">
                <div className="leftfilter">
                    <p className='filpro'>Filter Product:</p>
                    <select className='color' name='color' onChange={handlefilter}>
                        <option disabled >color</option>
                        <option>blue</option>
                        <option>red</option>
                        <option>pink</option>
                        <option>yellow</option>
                        <option>black</option>
                        <option>white</option>
                    </select>
                    <select name='size' onChange={handlefilter}>
                        <option disabled >Size</option>
                        <option>X</option>
                        <option>XXL</option>
                        <option>XL</option>
                        <option>M</option>
                        <option>L</option>
                    </select>
                </div>
                <div className="leftfilter">
                    <p>Sort product:</p>
                    <select onChange={(e)=>setSort(e.target.value)}>
                        <option value='newest'>Newest</option>
                        <option value='asc'>price(asc)</option>
                        <option value='desc'>price(desc)</option>
                    </select>
                    
                </div>
            </div>
                <Products cart={cat} filters={filters} sort={sort}/>
                <News/>
                <Info/>
            </div>
        </div>
    )
}
