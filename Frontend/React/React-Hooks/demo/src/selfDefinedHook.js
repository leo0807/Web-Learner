
import React, { useEffect, useState, useCallback } from 'react';
// 自定义组件开头必须使用use
function useWinSize() {
    const [size, setSize] = useState({
        width: document.documentELement.clientWidth,
        height: document.documentELement.clientHeight
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentELement.clientHeight
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return size
}

function Example() {
    const size = useWinSize();

    return (
        <div>页面size:{size.width} * {size.height}</div>
    )
}

export default Example