import React from 'react'
import ReactDOM from 'react-dom'

function ParentCom(props) {
  let headerCom, mainCom, footerCom;
  props.children.forEach(item => {
    if (item.props['data-name'] === 'header') {
      headerCom = item
    }else if(item.props['data-name'] === 'main') {
      mainCom = item
    }else if (item.props['data-name'] === 'footer') {
      footerCom = item
    }
  })
  return (
    <div>
      <h1>组件插槽</h1>
      <div className="header">{headerCom}</div>
      <div className="header">{mainCom}</div>
      <div className="header">{footerCom}</div>
      {/* {this.props.children} */}
    </div>
  );
}

ReactDOM.render(
  <ParentCom>
    <h2 data-name="header">头部组件</h2>
    <h2 data-name="main">主要组件</h2>
    <h2 data-name="footer">尾部组件</h2>
  </ParentCom>,
  document.querySelector('#root')
)


