import React from 'react'
import './Header.css'
import logo from '../../img/logo.png'
import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useStateValue } from '../../stateProvider';
import { Link } from 'react-router-dom';

function Header() {
    const [{ basket }, dispatch] = useStateValue();
    return (
        <div className="header">
            <Link to="/">
                <img className="header__logo" src={logo}
                    alt="amazon-logo" />
            </Link>
            <div className="header__option">
                <span className="header__optionLineOne">
                    <i class="fas fa-map-marker-alt"></i> Deliver to
                    </span>
                <span className="header__optionLineTwo">
                    Hong Kong
                    </span>
            </div>
            <div className="header__search">
                <div className="header__category">
                    All <ArrowDropDownIcon className="header__category--all" />
                </div>
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">
                <div className="header__option">
                    <ExpandMoreIcon className="header__category--more" />
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Hello, sign In
                    </span>
                    <span className="header__optionLineTwo header__account">
                        Account <span className="header__account--list">& Lists </span><ExpandMoreIcon className="header__category--more" />
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
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <AddShoppingCartIcon />
                        <div className="header__optionLineTwo header__basketCount">{basket?.length}</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
