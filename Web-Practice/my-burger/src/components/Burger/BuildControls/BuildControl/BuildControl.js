import React from 'react';
import styled from 'styled-components';

const BuildControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    margin:5px 0;
`;
const BuildControlButton = styled.button`
    display: block;
    font: inherit;
    padding: 5px;
    margin: 0 5px;
    width: 80px;
    border: 1px solid #AA6817;
    cursor: pointer;
    outline: none;
`;


const buildControl = (props) => (
    <BuildControl>
        <div>{props.label}</div>
        <BuildControlButton onClick={props.removed} disabled={props.disabled}>Less</BuildControlButton>
        <BuildControlButton onClick={props.added}>More</BuildControlButton>
    </BuildControl>

);

export default buildControl;