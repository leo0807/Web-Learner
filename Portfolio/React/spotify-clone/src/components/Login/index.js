import React from 'react'
import './Login.css'
import { loginURL } from '../../spotify';
export default function Login() {
    return (
        <div className="login">
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="" srcset="" />
            <a href={loginURL}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}
