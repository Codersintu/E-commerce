import React from 'react'
// import { Navbar } from '../../components/navbar/Navbar'
import { Gallery } from '../../components/gallery/Gallery'
import './home.css'
import { Products } from '../../components/products/Products'
import { News } from '../../components/news/News'
import { Slide } from '../../components/slide/Slide'
import { Info } from '../../components/info/Info'
import Galleryitem from '../../components/galleryitem/galleryitem'

export function Home(props) {
    

    return (
        <>
            <div className="home">
            <Slide/>
            <Galleryitem/>
            <div className="Pduct">
            <Products/>
            <Products/>

            </div>
            <News/>
            <Info/>
            </div>
        </>
    )
}
