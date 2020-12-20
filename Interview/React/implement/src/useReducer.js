import React, { useContext, useReducer } from 'react';

const Achild = () => {
    const { name } = useContext(AppContext);
    return (
        <div>这是组件A:{name}</div>
    )
}
const Bchild = () => {
    const { name } = useContext(AppContext);
    return (
        <div>这是组件B:{name}</div>
    )
}


const App = () => {
    const reducer = (state, action) => {
        const actionFn = {
            add: function () {
                return {
                    ...state,
                    count: state.count + 1
                }
            },
            sub: function () {
                return {
                    ...state,
                    count: state.count - 1
                }
            },

        }
        return actionFn[action.type]()
    }
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    const addCount = () => {
        dispatch({
            type:'add'
        })
    }
     return (
        <div>
            <div>{state.count}</div>
            <button onClick={addCount}>Click +</button>
        </div>
    )
}

export default App;