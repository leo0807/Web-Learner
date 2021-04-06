// applyMiddleware Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。
export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        let store = createStore(reducer, preloadedState, enhancer);
        let dispatch = store.dispatch();
        let chain = [];

        let middlewareApi = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        };
        chain = middlewares.map(middleware => middleware(middlewareApi));
        dispatch = compose(...chain)(store.dispatch);
        return { ...store, dispatch };
    }
}
//有中间件被放进了一个数组chain，然后嵌套执行，最后执行store.dispatch。可以看到，
// 中间件内部（middlewareAPI）可以拿到getState和dispatch这两个方法