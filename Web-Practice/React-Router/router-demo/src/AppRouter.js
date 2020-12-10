import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Index from './Pages/Index';
import List from './Pages/List';
import Home from './Pages/Home';

function AppRouter(){
    return (
        <Router>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/list/'>List</Link></li>
                <Route path='/' exact component={Index} />
                <Route path='/list/:id' component={List} />
                <Route path='/home' component={Home} />
            </ul>
        </Router>
    )
}
export default AppRouter;