import React from 'react'
import UserAdd from './UserAdd';
import UserList from './UserList';
import UserDetail from './UserDetail';
import { Link, Route } from './react-router-dom';
function User() {
    return (
        <div>
            <div className="col-md-2">
                <div className="nav nav-stacked">
                    <li><Link to="/user/add">ADD</Link></li>
                    <li><Link to="/user/list">List</Link></li>
                </div>
            </div>
            <div className="col-md-10">
                <Route path="/user/add" component={UserAdd}></Route>
                <Route path="/user/list" component={UserList}></Route>
                <Route path="/user/detail/:id" component={UserDetail}></Route>
            </div>
        </div>
    )
}

export default User
