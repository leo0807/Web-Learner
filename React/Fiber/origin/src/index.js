import React from './react';
import ReactDOM from './react-dom';
let style = { border: '3px solid border', margin: '5px' };
let element1 = (
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
// 虚拟DOM是一个对象，以JS对象的方式描述DOM对象
ReactDOM.render(
  element1,
  document.getElementById('root')
);
let render2 = document.getElementById('render2');
render2.addEventListener('click', () => {
  let element2 = (
    <div id="A1-new" style={style}>
      A1-new
      <div id="B1" style={style}>
        B1
      <div id="C1-new" style={style}></div>
        <div id="C2-new" style={style}></div>
      </div>
      <div id="B2-new" style={style}></div>
      <div id="B3-new" style={style}></div>
      <div id="B4-new" style={style}></div>

    </div>
  )
  // 虚拟DOM是一个对象，以JS对象的方式描述DOM对象
  ReactDOM.render(
    element2,
    document.getElementById('root')
  );
})


let render3 = document.getElementById('render2');
render2.addEventListener('click', () => {
  let element3 = (
    <div id="A1-new2" style={style}>
      A1-new2
      <div id="B1" style={style}>
        B1-new2
      <div id="C1-new2" style={style}>C1-new2</div>
        <div id="C2-new2" style={style}>C2-new2</div>
      </div>
      <div id="B2-new2" style={style}>B2-new2</div>
      <div id="B3-new2" style={style}>B2-new2</div>
      <div id="B4-new2" style={style}>B2-new2</div>

    </div>
  )
  // 虚拟DOM是一个对象，以JS对象的方式描述DOM对象
  ReactDOM.render(
    element3,
    document.getElementById('root')
  );
})


