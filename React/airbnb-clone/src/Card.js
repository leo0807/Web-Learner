import React from 'react'
import './Card.css'
function Card({src, title, description, price}) {
    return (
        <div className="card">
            <img src={src} alt="" />
            <div className="card__info">
                
            </div>
        </div>
    )
}

export default Card
