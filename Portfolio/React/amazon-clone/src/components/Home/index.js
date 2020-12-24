import React from 'react'
import './Home.css'
import Product from '../Product'
function index() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Projects/JumpIn/HongKong/Fuji_Tallhero_Jumpin_HK_Final_en_US_2X._CB449357092_.jpg" alt="" />
                {/* <img className="home__image" src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonMusic/2020/ACQ/Gateway/HolidayNonPromo/DV5/US-EN_100120_HOLNonPromo_ACQ_GW_Hero_D_3000x1200_CV4_2._CB415751492_.jpg" alt="" /> */}
            </div>
            <div className="home__row">
                <Product title="The lean startup" price={29.9}
                    image="htttps://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
                    rating={5} />
                <Product />
            </div>
            <div className="home__row">
                <Product />
                <Product />
            </div>
            <div className="home__row">
                <Product />
            </div>
        </div>
    )
}

export default index
