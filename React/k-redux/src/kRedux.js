export function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }
    let currentState = undefined;
    let curentListeners = [];
    function getState() {
        return currentState;
    }
    function dispatch(action) {
        currentState = reducer(currentState, action);
        // 监听函数是一个数组
        curentListeners.map(listener => listener());
    }
    // 订阅， 可以多次订阅
    function subscribe(listener) {
        // 每次订阅 把回掉放入回掉数组
        curentListeners.push(listener);
    }
    // 取值时候 不能和项目中的值重复
    dispatch({ type: "@INIT/REACT_REDUX_KKB" })
    return {
        getState, //获取状态
        dispatch, //派发
        subscribe //订阅
    }
}
export function applyMiddleware(...midlewares) {
    return createStore => (...args) => {
        const store = createStore(...args);
        let dispatch = store.dispatch;
        const middleApi = {
            getState: store.getState,
            dispatch
        }
        // 给middleware参数，比如说dispatch
        const middlewaresChain = midlewares.map(middleware => middleware(middleApi));
        dispatch = compose(middlewaresChain)(dispatch);
        return {
            ...store,
            dispatch
        }
    }
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}