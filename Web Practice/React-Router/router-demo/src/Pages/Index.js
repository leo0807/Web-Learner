import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            list:[
                {cid:123,title:'123'},
                {cid:234,title:'234'},
                {cid:345,title:'345'}
            ]
         }
         this.props.history.push('/home/');
    }
    render() { 
        return (
            <div>
            {/* <Redirect to='/home/' /> */}
            <h2>Scott.com</h2>
            <ul>
                {
                    this.state.list.map((item, index) => {
                       return  (<li key={index}><Link to={'/list/'+item.cid}>{item.title}</Link></li>)
                    })
                }
            </ul>
            </div> 
            );
    }
}
 
export default Index;