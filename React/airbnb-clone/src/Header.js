import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './Header.css'
function Header() {
    return (
        <div className="header">
            <img className="header__icon" src="./img/airbnb_logo.jpg" alt="" />
            <div className="header__center">
                <input type="text" />
                <SearchIcon />
            </div>
            <div className="header__right">
                <p>Become a host</p>
            </div>
        </div>
    )
}

export default Header
