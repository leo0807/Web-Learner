import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import SubHeader from './components/SubHeader'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/Checkout'
function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <SubHeader />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
