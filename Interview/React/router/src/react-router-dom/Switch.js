import React from 'react'
import { Consumer } from './context';
import { pathToRegexp } from 'path-to-regexp';
// Switch的作用： 只匹配一个
function Switch(props) {
    return (
        <Consumer>
            {state => {
                let pathname = state.location.pathname;
                let children = props.children;
                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    // Redirect 可能没有path 属性
                    let path = child.props.path || '';
                    let reg = pathToRegexp(path, [], { end: false });
                    // Swicth匹配成功
                    if (reg.test(pathname)) {
                        return child; //把匹配到到组件返回
                    }
                }
                return null;
            }}
        </Consumer>
    )
}

export default Switch
