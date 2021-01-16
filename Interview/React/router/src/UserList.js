import React from 'react'
import { Link } from './react-router-dom';
function UserList() {
    return (
        <div>
            List
            <Link to="/user/detail/1">User 1</Link>
            <Link to="/user/detail/2">User 2</Link>
            <Link to="/user/detail/3">User 3</Link>
        </div>
    )
}

export default UserList
