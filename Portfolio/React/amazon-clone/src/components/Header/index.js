import React from 'react'
import './Header.css'
import logo from '../../img/amazon-logo.png'
import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
function index() {
    return (
        <div className="header">
            <img className="header__logo" src={logo}
                alt="amazon-logo" />
            <div className="header__search">
                <div className="header__category">
                    All <ArrowDropDownIcon className="header__category--all" />
                </div>
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Hello, sign In
                    </span>
                    <span className="header__optionLineTwo account">
                        Account & Lists <ExpandMoreIcon className="header__category--more" />
                    </span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Returns
                    </span>
                    <span className="header__optionLineTwo">
                        & Orders
                    </span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                    </span>
                </div>

                <div className="header__optionBasket">
                    <AddShoppingCartIcon />
                    <div className="header__optionLineTwo header__basketCount">0</div>
                </div>
            </div>
        </div>
    )
}

export default index
