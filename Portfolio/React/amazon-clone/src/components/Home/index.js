import React from 'react'
import './Home.css'
import Product from '../Product'
function index() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Projects/JumpIn/HongKong/Fuji_Tallhero_Jumpin_HK_Final_en_US_2X._CB449357092_.jpg" alt="" />
            </div>
            <div className="home__row">
                <Product />
                <Product />
            </div>
            <div className="home__row">

            </div>
            <div className="home__row">

            </div>
        </div>
    )
}

export default index
