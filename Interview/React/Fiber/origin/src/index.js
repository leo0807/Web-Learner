import React from 'react';
import ReactDOM from 'react-dom';
let style = { border: '3px solid border', margin: '5px' };
let element = (
  <div id="A1" style={style}>
    A1
    <div id="B1" style={style}>
      B1
      <div id="C1" style={style}></div>
      <div id="C2" style={style}></div>
    </div>
    <div id="B2" style={style}></div>
  </div>
)
console.log(element);
// 虚拟DOM是一个对象，以JS对象的方式描述DOM对象
ReactDOM.render(
  element,
  document.getElementById('root')
);

