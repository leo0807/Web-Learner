import './App.css';
import Header from './Header';
import Nav from './Nav';
import Results from './Results';
import React, { useState } from "react";
import request from './request';
function App() {
  const [selectedOption, setSelectedOption] = useState(request.fetchTrending);

  return (
    <div className="app">
      <Header />
      <Nav setSelectedOption={setSelectedOption}/>
      <Results selectedOption={selectedOption} />
    </div>
  );
}

export default App;
