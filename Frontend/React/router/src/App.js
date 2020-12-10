import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Topics from './Topics'
import Content from './Content'
import Home from './Home'
import Product from './Product'
import News from './News'
import React, { Component } from 'react'
import ProductContent from './ProductContent'

class App extends Component {
  constructor() {
    super()
    this.state = {
  
    }
  }
  render() {
    return (
      <Router>
        <div>
          {/* 页面跳转 */}
          <Link to="/">Home</Link>
          <hr/>
          <Link to="/news">News</Link>
          <hr/>
          <Link to="/product">product</Link>

          {/* <Content /> */}
  
          <Route exact path="/" component={Home} />
          <Route path="/news" component={News}/>
          <Route path="/topic" component={Topics}/>
          <Route path="/product" component={Product} />
          <Route path="/content/:aid" component={Content} />
          <Route path="/productcontent/:aid" component={ProductContent} />
          
        </div>
      </Router>
    );
  }
}

export default App;
