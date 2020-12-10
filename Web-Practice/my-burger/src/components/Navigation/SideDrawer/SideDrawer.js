import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItem/NavigationItems';
import styled from 'styled-components';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
const Nav = styled.nav`
    height: 100%;
`;

const SideDrawer = styled.div`
    position:fixed;
    width:280px;
    max-width:70%;
    height:100%;
    left:0;
    top:0;
    z-index:200;
    background-color:white;
    padding:32 16px;
    box-sizing:border-box;
    transition: transform .3s ease-out;
    transform: ${props => props.open? "translateX(0)":"translateX(-100%)"};

    @media (min-width: 500px){
        display:none;
    }
`;
const DivFrame = styled.div`
    height: 11%;
    margin-bottom: 32px;
`;

// const Open = styled`
//     transform: translateX(0);
//     transform:translateX(-100%);
// `;

const sideDrawer = (props) =>{
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            {console.log(SideDrawer)}
            <SideDrawer>
                <DivFrame>
                    <Logo />
                </DivFrame>
                <Nav>
                    <NavigationItems />
                </Nav>
            </SideDrawer>
        </Aux>
    );
};

export default sideDrawer;