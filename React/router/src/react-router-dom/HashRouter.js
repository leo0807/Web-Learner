import React, { useEffect, useState } from 'react'
import { Provider } from './context';
function HashRouter(props) {
    const [location, setLocation] = useState({
        pathname: window.location.hash.slice(1) || '/',
        a: 1
    });
    useEffect(() => {
        // 默认hash没有时，跳转到‘/’
        window.location.hash = window.location.hash || '/';
        // 监听hash变化重新设置状态
        window.addEventListener('hashchange', () => {
            setLocation({ ...location, pathname: window.location.hash.slice(1) || '/' })
        })
    })
    let value = {
        location: location,
        history: {
            push(to) {
                window.location.hash = to;
            }
        }
    }
    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    )
}

export default HashRouter
