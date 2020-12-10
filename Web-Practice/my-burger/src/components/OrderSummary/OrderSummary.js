import React from 'react';
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button';

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredient).map(igKey =>{
    return (<li key={igKey}><span style ={{textTransform:'capitalize'}}>{igKey}</span>:
        {props.ingredient[igKey]}</li>);
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A deliciouus burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked = {props.purchaseCance}>CANCEL</Button>
            <Button btnType="Sucess" clicked = {props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default  orderSummary;