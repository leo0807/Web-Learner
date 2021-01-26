import React, { useState } from 'react'
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { db, auth } from '../../firebase';
function Login() {
    const history = useHistory() //change url
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault();
        // Firebase Login
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth) {
                    history.push('/');
                }
            })
            .catch(error => alert(error.message));
    }
    const register = (e) => {
        e.preventDefault();
        // Firebase register
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // successfullty create a new user with email and password
                console.log(auth);
                if (auth) {
                    history.push('/');
                }
            })
            .catch(err => console.log(err.message));
    }
    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" />
            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="login__signInButton" type="submit" onClick={signIn}>Sign In</button>
                    <p>
                        By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                        see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                    </p>
                    <button className="login__registerButton" type="submit" onClick={register}>Create your Amazon Account</button>
                </form>
            </div>
        </div>
    )
}

export default Login
