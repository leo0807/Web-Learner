import React, { createRef } from 'react';
import './App.css';

function App() {
  function traceInput(e) {
    console.log(e.target.value);
  }
  let inputRef = createRef();
  return (
    <div className="App">
      <input type="text" onChange={(e) => traceInput(e)} />
      <input type="text" ref={inputRef} onChange={() => console.log(inputRef.current.value)} />
    </div>
  );
}

export default App;
