import './App.css';
import React from 'react'
import Home from './pages/Home'
import SingleRoom from './pages/SingleRoom'
import Rooms from './pages/Rooms'
import Error from './pages/Error'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/Navbar'


function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path = "/" exact component={Home} />
        <Route path = "/rooms/" exact component={Rooms} />
        <Route path="/rooms/:slug" exact component={SingleRoom} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
