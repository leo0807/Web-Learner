import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect, Switch } from './react-router-dom';
import Home from './Home';
import User from './User';
import Profile from './Proile';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <Router>
      <div className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-heading">
            <div className="navbar-brand">Router</div>
          </div>
        </div>
        <div className="nav navbar-nav">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/user">User</Link></li>
        </div>
      </div>
      <div className="container">
        {/* Switch 只匹配一个就不再继续匹配 */}
        <Switch>
          <Route path="/home" exact={true} component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/user" component={User} />
          <Redirect to="/home"></Redirect>
        </Switch>
      </div>
    </Router>
  )
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

