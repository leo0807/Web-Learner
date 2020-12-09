import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './Header.css'
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
function Header() {
    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className="header__icon"
                    src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                    alt=""
                />
            </Link>
           
            <div className='header__center'>
                <input type="text" placeholder="Start your search"/>
                <SearchIcon />
            </div>

            <div className='header__right'>
                <p className="header__right--shadow">Become a host</p>
                <LanguageIcon className="header__right--shadow"/>
                <ExpandMoreIcon />
                <DehazeIcon />
                <AccountCircleIcon fontSize="large" />
            </div>
        </div>
    )
}

export default Header
