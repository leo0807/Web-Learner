import React from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItems = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-flow:column;
    align-items:center;
    height:100%;

    @media (min-width){
        flex-flow:row;
    }
`;

const navigationItems = () => (
    <NavigationItems>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/" active>Checkout</NavigationItem>
    </NavigationItems>
);

export default navigationItems;