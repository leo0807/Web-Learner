import React from 'react';
import styled from 'styled-components';
const Button = styled.button`
    background-color: transparent;
    border: none;
    color: ${props => props.btnType === "Danger"? "#5C9210" : "#944317"};
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;

  &:first-of-type {
    margin-left: 0;
    padding-left: 0;
}

.Success {
    color: #5C9210;
}

.Danger {
    color: #944317;
}
`;
const button = (props) =>(
    <Button onClick={props.clicked} btnType={props.btnType}> {props.children} </Button>
);
export default button;