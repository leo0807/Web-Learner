import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from '../../stateProvider';
import CheckoutProduct from '../CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../reducer';
import axios from '../../axios';
import { db } from '../../firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [succeed, setSucceed] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);


    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const reponse = await axios({
                method: 'POST',
                // Stripe expects the total in a currencies subunties
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            // Permission
            setClientSecret(reponse.data.clientSecret);
        }
        getClientSecret();
    }, [basket])
    const handleSubmit = async e => {
        // do stripe-related stuff
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // PaymentInent = payment confirmation

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id) //create payment 
                .set({                 // add below details
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceed(true);
            setError(null);
            setProcessing(false);
            history.replace('/orders');
            dispatch({
                type: 'EMPTY_BASKET'
            });
        })
    }
    const handleChange = e => {
        // 1. Listen the changes in the CardElement
        // 2. Display any errors as the customer types and their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout( <Link to="/checkout">{basket?.length} items</Link> )
                </h1>
                {/* Payment Address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delevery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                {/* Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                key={item}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* Payment Method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeperator={true}
                                    prefix={"$"}
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                />
                                <button disabled={processing || disabled || succeed}>
                                    <span>{processing ? <p>processing</p> : "Buy Now!"}</span>
                                </button>
                            </div>
                            {/* Error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
