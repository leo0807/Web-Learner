import React from 'react';
import styled from 'styled-components';

const NavigationItem = styled.li`
    margin:10px 0;
    box-sizing:border-box;
    display:block;
    width:100%;


    @media (min-width:500px){
        margin: 0;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;
    }
`;

const NavigationLink =  styled.a`
    color: #8F5C2C;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    display: block;
    
    &:hover, &:active, &.active{
        color:${props => props.active && "#40A4C8"}；
    }

    @media (min-width:500px){
        color: white;
        height: 100%;
        padding: 16px 10px;
        border-bottom: 4px solid transparent;

        &:hover, &:active, &.active{
            background-color:${props => props.active && "#8F5C2C"};
            border-bottom: ${props => props.active && "4px solid #40A4C8"};
            color:${props => props.active && "white"}；
        }
    }
`;


const navigationItem = (props) => (
    <NavigationItem>
        <NavigationLink active={props.active} href={props.link}>{props.children}</NavigationLink>
    </NavigationItem>
);
export default navigationItem;