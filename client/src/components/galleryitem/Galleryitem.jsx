import React from "react";
import { Gallery } from "../gallery/Gallery";
import { categories } from "../../../data";
import './galleryitem.css'
const Galleryitem = () => {
  return (
    <div className="galleryitem">
      {categories.map((item) => (
        <Gallery item={item} key={item.id} />
      ))}
      </div>
    
  );
};

export default Galleryitem;