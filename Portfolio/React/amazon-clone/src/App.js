import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import SubHeader from './components/SubHeader'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/Checkout'
import Login from './components/Login'
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './stateProvider';
import Payment from './components/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

// stripe public key 
const promise = loadStripe('pk_test_51IDrlfKan2UWK9lDOLifA2bgFtJ2m9vlghPNCakHzDMGCNI1B38m7JdvUAekKpB3X6GVgv3jI6ydhraJN2HVGTIs00SC40DsGn');

function App() {
  const [_, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // the user just logged in/ the use was logged in (refresh the page)
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <SubHeader />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
