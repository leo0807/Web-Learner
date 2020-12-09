import React, { useState} from 'react'
import './Banner.css'
import {Button} from "@material-ui/core"
import Search from './Search'
import {useHistory} from 'react-router-dom'
function Banner() {

    const history = useHistory();
    const [showSearch, setShowSearch] = useState(false)
    return (
        <div className="banner">
            {showSearch && <Search />}
            <div className="banner__search">
                <Button onClick={()=>setShowSearch(!showSearch)} variant="outlined" className="banner__searchButton">{showSearch?"Hide":"Search Airbnb"}</Button>
            </div>
            <div className="banner__info">
                <h1>Get out and stretch out your imagination</h1>
                <h5>Plan a diffrent kind of getway to uncover the hidden gems near you.</h5>
                <Button variant="outlined" onClick={()=>history.push('/search')}>Explore Nearby</Button>
            </div>
        </div>
    )
}

export default Banner
