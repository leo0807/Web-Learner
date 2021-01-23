import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * 1. 在所有DOM变更之后同步调用effect
 * 2. useEffect不会阻塞浏览器渲染， 而useLayoutEffect会
 * 3. useEffect在浏览器渲染结束后执行m，useLayout则是在DOM更新完成后，浏览器绘制之前决定
 */
let lastEffectDependencies;
function useEffect(callback, dependencies) {
    if (lastEffectDependencies) {
        let changed = !dependencies.every((item, index) => {
            // 查看新的依赖数组是不是每一项都和老的依赖项数组相同
            return item === lastEffectDependencies[index];
        })
        // 改变了
        if (changed) {
            callback();
            lastEffectDependencies = dependencies;
        }
    } else {
        //没有渲染过
        callback();
        lastEffectDependencies = dependencies;
    }
}
let lastLayoutEffectDependencies;
function useLayoutEffect(callback, dependencies) {
    if (lastLayoutEffectDependencies) {
        let changed = !dependencies.every((item, index) => {
            // 查看新的依赖数组是不是每一项都和老的依赖项数组相同
            return item === lastLayoutEffectDependencies[index];
        })
        // 改变了
        if (changed) {
            Promise.resolve().then(callback);
            // queueMicrotask(callback); 相同效果
            lastLayoutEffectDependencies = dependencies;
        }
    } else {
        //没有渲染过
        Promise.resolve().then(callback);
        lastLayoutEffectDependencies = dependencies;
    }
}

let lastRef;
function useRef(initialState) {
    lastRef = lastRef || initialState;
    return {
        current: lastRef
    }
}
function Counter() {
    let [name, setName] = useState('junxu');
    let [number, setNumber] = useState(0);
    //useEffect在渲染之后执行
    useEffect(() => {
        console.log(number);
    }, [number])
    return (
        <div>
            <p>{name}</p>
            <p>{number}</p>
            <button onClick={() => setName(Date.now() + '')}>Modify Name</button>
            <button onClick={() => setNumber(number + 1)}>+</button>
        </div>
    )
}
function render() {
    // index = 0;
    ReactDOM.render(
        <Counter />,
        document.getElementById('root')
    );
}
render();

// https://juejin.cn/post/6890349061019271182#heading-21