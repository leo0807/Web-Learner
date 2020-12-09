import React from 'react';
import {Route, Link} from 'react-router-dom';
import Money from './workplace/Money';
import GetUp from './workplace/GetUp';

export default function WorkPlace() {
    return (
        <div>
            <div className='topNav'>
                <ul>
                    <li><Link to='/workplace/money/'>程序员加薪秘籍</Link></li>
                    <li><Link to='/workplace/getup/'>起床攻略</Link></li>
                </ul>
            </div>
            <div className='videoContent'>
                <div><h3>Video Tutorial</h3></div>
                <Route path='/workplace/money/' component={Money} />
                <Route path='/workplace/getup/' component={GetUp} />
            </div>
        </div>
    )
}
