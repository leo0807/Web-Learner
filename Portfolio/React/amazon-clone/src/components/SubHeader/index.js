import React from 'react'
import './SubHeader.css'
import MenuIcon from '@material-ui/icons/Menu';
function index() {
    return (
        <div className="subHeader">
            <div className="subHeader__content">
                <div className="subHeader__content--left">
                    {/* <div cldivssNdivme="subHeader__content--all"> */}
                    <MenuIcon className="subHeader__content--menu" /> <a href="/">All</a>

                    <a href="/">Today's Deals</a>
                    <a href="/">Customer Service</a>
                    <a href="/">Gift Cards</a>
                    <a href="/">Sell</a>
                    <a href="/">Registry</a>
                </div>
                <span className="subHeader__content--right">
                    Amazon's response to COVID-19
                </span>
            </div>
        </div>
    )
}

export default index
