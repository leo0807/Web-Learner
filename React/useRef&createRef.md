# useRef和createRef的区别
1. useRef 仅能用在 FunctionComponent，createRef 仅能用在 ClassComponent
    - createRef因为没有Hooks的效果，会随着函数组件的重复执行而不短初始化
    - 而在类组件中，因为生命周期的分离，componentDidMount仅执行一次
2. 由于 Ref 是贯穿 FunctionComponent 所有渲染周期的实例，理论上在任何地方都可以做修改
但是在**Render phase**阶段是不允许做 “side effects” 的，也就是写副作用代码，这是因为这个阶段可能会被 React 引擎随时取消或重做

举例：
```
import React, {useRef, useState, createRef} from 'react';

export default function App(){
    const [count, setCount] = useState(0);
    const refCount = useRef(count);
    const inputELement = createRef();
    // const inputELement = useRef();
    // 实现同样效果
    // createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用
    const handleFocusInput = () => {
        inputELement.current.focus();
    }
    function clickHandler(){
        setTimeout(()=>{
            alert(count);
        }, 3000)
    }
    return (
        <div class="App">
            <p>You clicked {count} times.</p>
            <button onClick={()=>setCount(count + 1)}>Click</button>
            <button onClick={clickHandler}>Delay Click</button>
            <hr/>
            <input type="text" ref={inputELement} />
            <button onClick={handleFocusInput}> Focus </button>
        </div>
    )
}
```
**应用**：记录上一次的值
```
import React, {useEffect, useRef, useState} from 'react';

function usePreviousHook(state){
    const ref = useRef();
    useEffect(()=>{
        ref.current = state;
    })
    return ref.current;
}

export default function App(){
    const [count, setCount] = useState(0);
    const prevCount = usePreviousHook(count);
    return (
        <div className="App">
            <button onClick={()=>setCount(count + 1)}>+</button>
            <button onClick={()=>setCount(count - 1)}>-</button>
            <p>Now {count}, prevous {prevCount}</p>
        </div>
    )
}

```
