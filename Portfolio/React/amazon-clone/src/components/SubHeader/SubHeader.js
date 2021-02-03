import React from 'react'
import './SubHeader.css'
import MenuIcon from '@material-ui/icons/Menu';
function SubHeader() {
    return (
        <div className="subHeader">
            <div className="subHeader__content">
                <div className="subHeader__content--left">
                    {/* <div cldivssNdivme="subHeader__content--all"> */}
                    <span href="/"><MenuIcon className="subHeader__content--menu" /> All</span>
                    <a href="/">Today's Deals</a>
                    <a href="/">Customer Service</a>
                    <a href="/">Gift Cards</a>
                    <a href="/">Sell</a>
                    <a href="/">Registry</a>
                </div>
                <div className="subHeader__content--right">
                    Amazon's response to COVID-19
                </div>
            </div>
        </div>
    )
}

export default SubHeader
