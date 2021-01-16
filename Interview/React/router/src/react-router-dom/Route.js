import React from 'react'
import { Consumer } from './context';
import { pathToRegexp } from 'path-to-regexp';
function Route(props) {
    return (
        <Consumer>
            {state => {
                // path是Route中传递的
                // pathname是location中的
                let { path, component: Component, exact = false } = props;
                let pathname = state.location.pathname;
                // 根据正则实现一个正则 通过正则匹配
                let keys = [];
                let reg = pathToRegexp(path, keys, { end: exact });
                keys = keys.map(item => item.name); //[id]
                let result = pathname.match(reg);
                let [url, ...values] = result || []; //[1]
                let attrs = {
                    location: state.location,
                    history: state.history,
                    match: {
                        params: keys.reduce((obj, current, idx) => {
                            obj[current] = values[idx];
                            return obj;
                        }, {})
                    }
                }
                if (result) {
                    return <Component {...attrs}></Component>
                }
                return null;
            }}
        </Consumer>
    )
}

export default Route
