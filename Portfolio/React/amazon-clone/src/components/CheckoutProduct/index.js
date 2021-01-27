import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from '../../stateProvider';
function CheckoutProduct({ id, image, title, price, rating, hidebutton }) {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        // remove item from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt="" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <p className="checkoutProduct__rating">
                    {Array(rating).fill().map((item, i) => <span key={i * Math.random()}>🌟</span>)}
                </p>
                {!hidebutton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )
                }

            </div>
        </div>
    )
}

export default CheckoutProduct
