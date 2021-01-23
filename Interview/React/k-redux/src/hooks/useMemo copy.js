import React, { memo } from 'react';
import ReactDOM from 'react-dom';

// States 不止一个
// 不能在if等条件语句中使用useState
let lastStates = [];
let index = 0;
function useState(initialState) {
    lastStates[index] = lastStates[index] || initialState;
    const currentIndex = index;
    function setState(newState) {
        lastStates[currentIndex] = newState;
        render();
    }
    return [lastStates[index++], setState];
}
// 因为_state是一个数组，所以每次react都会按数组的顺序进行改变，也就是useState不能写在if/else循环里

let lastCallback;
let lastCallbackDependencies;
function useCallback(callback, dependencies) {
    if (lastCallbackDependencies) {
        let changed = !dependencies.every((item, index) => {
            // 查看新的依赖数组是不是每一项都和老的依赖项数组相同
            return item === lastCallbackDependencies[index];
        })
        // 改变了
        if (changed) {
            lastCallback = callback;
            lastCallbackDependencies = dependencies;
        }
    } else {
        //没有渲染过
        lastCallback = callback;
        lastCallbackDependencies = dependencies;
    }
    return lastCallback;
}
let lastMemo;
let lastMemoDependencies
function useMemo(callback, dependencies) {
    if (lastMemoDependencies) {
        let changed = !dependencies.every((item, index) => {
            // 查看新的依赖数组是不是每一项都和老的依赖项数组相同
            return item === lastMemoDependencies[index];
        })
        // 改变了
        if (changed) {
            lastMemo = callback();
            lastMemoDependencies = dependencies;
        }
    } else {
        //没有渲染过
        lastMemo = callback();
        lastMemoDependencies = dependencies;
    }
    return lastMemo;
}
function Child({ data, addClick }) {
    console.log('Child render');
    return <button onClick={addClick}>{data.number}</button>
}
// 将函数组件传给memo方法，返回一个新组件，改造后每次渲染钱会判断属性是否改变，
// 属性不改变则不渲染
Child = memo(Child);
function App() {
    let [number, setNumber] = useState(0);
    let [name, setName] = useState('junxu');
    let addClick = useCallback(() => setNumber(number + 1), [number]);
    let data = useMemo(() => ({ number }), [number]);
    return (
        <div>
            <input value={name} onChange={event => setName(event.target.value)} />
            <Child data={data} addClick={addClick}></Child>
        </div>
    )
}

function render() {
    index = 0;
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}
render();