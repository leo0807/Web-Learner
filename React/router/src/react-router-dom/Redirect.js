import React from 'react'
import { Consumer } from './context';
function Redirect(props) {
    return (
        <Consumer>
            {state => {
                // 重定向就是匹配不到后直接跳转到redirect中to的路径
                state.history.push(props.to);
                return null;
            }}
        </Consumer>
    )
}

export default Redirect
