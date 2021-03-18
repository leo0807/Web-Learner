// const [state, dispatch] = useReducer(reducer, initState);
// useReducer接收两个参数：
// 第一个参数：reducer函数，第二个参数：初始化的state。
// 返回值为最新的state和dispatch函数（用来触发reducer函数，计算对应的state）。
// 按照官方的说法：对于复杂的state操作逻辑，嵌套的state的对象，推荐使用useReducer。

let lastState;
function useReducer(reducer, initialState) {
    lastState = lastState || initialState;
    function dispatch(action) {
        lastState = reducer(lastState, action);
        render();
    }
    return [lastState, dispatch];
}