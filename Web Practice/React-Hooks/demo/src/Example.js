import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
function Index(){
    useEffect(()=>{
        console.log('This is the Index Page');
        return ()=>{console.log('Left Index Page')};
    })
    return (<h1>Home Page</h1>)
}

function ListPage(){
    useEffect(()=>{
        console.log('This is the List Page');
        return ()=>{console.log('Left List Page')};
        
    })
    return (<h2>List Page</h2>)
}
export default function Example() {
    const [count, setCount] = useState(0);
    useEffect(()=>{
        console.log('This is the useEffect');
    })
    return (
        <div>
            <p>You Clicked The Button {count} Times</p>
            <button onClick={()=>setCount( count + 1)}>Click Me</button>

            <Router>
                <ul>
                    <li><Link to='/'>Home Page</Link></li>
                    <li><Link to='/list/'>List Page</Link></li>
                </ul>
            </Router>
            <Route path='/' exact component={Index} />
            <Route path='/list/' component={ListPage} />
        </div>
    )
}
