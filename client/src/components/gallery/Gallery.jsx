import React from 'react'
import './gallery.css'
import {Link} from 'react-router-dom'

export function Gallery({item}) {
    

    return (
    <div className="gallery">
        <div className="gallerywrapper">
            <Link to={`/category/${item.cat}`}>
        <div className="roboimg">
            <img className='pongo' src={item.img} alt="" />
            <div className="about">
            <h1>{item.title}</h1>
            <button>Shop Now</button>
            </div>
         </div>
         </Link>
        </div>
       
        
    </div>
    )
}
