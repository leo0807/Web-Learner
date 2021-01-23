import React, { memo } from 'react';
import ReactDOM from 'react-dom';
// 旧状态，派发action
function reducer(state, action) {
    if (action.type === 'add') {
        return state + 1;
    }
    return state;
}

let lastState;
function useReducer(reducer, initialState) {
    lastState = lastState || initialState;
    function dispatch(action) {
        lastState = reducer(lastState, action);
        render();
    }
    return [lastState, dispatch];
}
function Counter() {
    let [state, dispatch] = useReducer(reducer, 0);
    return (
        <div>
            <p>{state}</p>
            <button onClick={() => dispatch({ type: 'add' })}>+</button>
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