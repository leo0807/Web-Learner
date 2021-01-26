import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../stateProvider'
import { getBasketTotal } from '../../reducer';
import { useHistory } from 'react-router-dom';
function Subtotal() {
    const [{ basket }, dispatch] = useStateValue();
    const history = useHistory();
    // const getBasketTotal = (basket) => {
    //     basket?.reduce((amount, item) => amount + item.price, 0);
    // }
    return (
        <div className="subtotal">
            <CurrencyFormat
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeperator={true}
                prefix={"£"}
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items):
                            <strong>{`${value}`}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> The order contains a gift
                        </small>
                    </>
                )}
            />
            <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
