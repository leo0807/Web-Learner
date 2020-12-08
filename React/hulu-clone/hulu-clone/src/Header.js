import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import './Header.css'


function Header() {
    return (
        // BEM Naming Convention
        <div className="header">
            <div className="header__icons">
                <div className="header__icon header__icon--active">
                    <HomeIcon />
                    <p>Home</p>
                </div>
                <div className="header__icon header__icon--active">
                    <FlashOnIcon />
                    <p>Trending</p>
                </div>
                <div className="header__icon header__icon--active">
                    <LiveTvIcon />
                    <p>Verified</p>
                </div>
                <div className="header__icon header__icon--active">
                    <VideoLibraryIcon />
                    <p>Collections</p>
                </div>
                <div className="header__icon header__icon--active">
                    <SearchIcon />
                    <p>Search</p>
                </div>
                <div className="header__icon header__icon--active">
                    <PersonOutlineIcon />
                    <p>Account</p>
                </div>
            </div>

            
            <img src="https://hulu-matchmaker.s3.us-west-2.amazonaws.com/2020-08/Hulu_Logo-01_newgreen.png" alt="" srcset=""/>
        </div>
    )
}

export default Header
