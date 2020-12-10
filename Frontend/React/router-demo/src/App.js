import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import User from './User'

function App() {
  return (
    <Router>
      <div id="App">
        <div className="title">
          <Link to="/">首页组件</Link>
          <Link to="/user">用户页面</Link>
        </div>
        <Route exact path="/" component={Home}></Route>
        <Route path="/user" component={User}></Route>
      </div>
    </Router>
  );
}

export default App;
