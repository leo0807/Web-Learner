import React from 'react';
import styled from 'styled-components';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const Burger = styled.div`
    width:100%;
    margin: auto;
    height: 250px;
    overflow: scroll;
    text-align: center;
    font-weight:bold;
    font-size:1.2rem;

    @media (min-width: 500) and (min-height: 401){
        width: 350;
        height: 300;
    }

    @media (min-width: 1000px) and (min-height: 700px){
        width: 700px;
        height: 600px;
    }
`;
const burger = (props) =>{
    let transformedIngredient = Object.keys(props.ingredient).map(igKey => {
        
        return [...Array(props.ingredient[igKey])].map((_, index) =>{
            return <BurgerIngredient key={igKey + index} type = {igKey} />
        });
    }).reduce((arr,el) => {
        return arr.concat(el);
    }, []);
    if(transformedIngredient.length === 0){
        transformedIngredient = <p>Please Start Adding Ingredients!</p>;
    }

    //console.log(transformedIngredient);
    return (
        <Burger>
            <BurgerIngredient type ="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type ="bread-bottom" />
        </Burger>
    );
};
export default burger;