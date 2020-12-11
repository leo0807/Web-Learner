import React, { useContext } from 'react'
import { ColorContext, UPDATE_COLOR } from './Color';

function Buttons() {
  const { dispatch } = useContext(ColorContext);
  return (
    <div className="buttons">
      <button onClick={() =>{dispatch({type:UPDATE_COLOR,color: "red"})}}>红色</button>
      <button onClick={() =>{dispatch({type:UPDATE_COLOR,color: "yellow"})}}>黄色</button>
    </div>
  );
}

export default Buttons;
