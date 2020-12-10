import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Main from './Main'
import Info from './Info'

import './User.css'
class User extends Component{
    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="user">
            <div className="content">
              <div className="left">
                <Link to="/user/">个人中心</Link>
                        <br />
                        <br/>
                <Link to="/user/info">用户中心</Link>
              </div>
              <div className="right">
            <Route exact path="/user/" component={Info} />     
            <Route path="/user/info" component={Main} />     
              </div>
            </div>
          </div>
        )
    }
}

export default User