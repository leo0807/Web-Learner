import React, { useState } from 'react';
import fetchJsonp from 'fetch-jsonp';
export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [arrVal, setArrVal] = useState([]);
  function handleInputChange(e) {
    let val = e.target.value;
    setInputVal(val);
    let URL = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=';
    fetchJsonp(URL + val, { jsonpCallback: 'cb' }).then((streamObj) => {
      streamObj.json().then(data => {
        setArrVal(data.s);
      })
    })
  }
  function mouseOverHandler(e) {
    e.target.style.backgroundColor = "#ccc";
    e.target.style.color = "darkgreen";
  }
  function mouseOutHandler(e) {
    e.target.className = "";
  }
  return (
    <div className="App">
      <input type="text" value={inputVal} onChange={(e) => handleInputChange(e)} />
      { inputVal.length > 0 && <ul>
        {
          arrVal.map((val, index) => {
            return (
              <li key={index} onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>{val}</li>
            )
          })
        }
      </ul>}
    </div>
  )
}