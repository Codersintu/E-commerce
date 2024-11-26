import React, { useEffect, useState } from 'react'
import './slide.css'
import img from '../../assets/man.png'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import { sliderItems } from '../../../data';
import { Link } from 'react-router-dom';

export function Slide(props) {
  
    // State to track the current active slide
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));

  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000); // Change slide every 1 second

    
    return () => {
        clearInterval(slideInterval);
    };
}, []); 


  return (
    <div className="anounce">
      <ArrowLeft className="slider left" onClick={prevSlide} />
      
      {sliderItems.map((item, index) => (
        <div
          key={item.id}
          className={`anouncewrap ${index === currentSlide ? 'active' : ''}`}
        >
          <div className="anounceleft">
            <div className="teal"></div>
            <img src={item.img} className="hot" alt="Sale" />
          </div>
          <div className="anounceright">
            <h1 className="sale">{item.title}</h1>
            <span className="desc">{item.desc}</span>
            <Link to='/category/:product'>
            <div className="shopbtn">
              <button className="knowbn">Shop Now <ArrowRight /></button>
            </div>
            </Link>
          </div>
        </div>
      ))}

      <ArrowRight className="slider right" onClick={nextSlide} />
    </div>
  );
}
