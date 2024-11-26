import React from 'react'
import { Send } from "@mui/icons-material"
import './news.css'

export function News(props) {
    

    return (
        <div className="news">
            <div className="newswrapper">
                <h1>NewsLatter !</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, veniam.</p>
                <div className="search">
                    <input type="text" />
                    <button><Send/></button>
                </div>
            </div>
        </div>
    )
}
