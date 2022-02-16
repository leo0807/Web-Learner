import { createContext, StrictMode, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
/** reducer
export const initialState = {count: 0};

export function reducer(state, action){
  switch(action.type){
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
    }
}
 */

/**
 * Redux 三原则
 * 1. 单一数据源： 整个应用的state存储在单个store的对象树中；
 * 2. state为只读： 改变state的唯一方法为action；
 * 3. 使用纯函数来修改 - 为了描述actions是如何修改state，你需要编写reducers
 */

import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");
const AppContext = createContext({});
const { Provider } = AppContext;
function App() {
    const store = useReducer(reducer, initialState);
    return (
        <Provider value={store}>
            <div>
                <TopNavBar />
            </div>
        </Provider>
    );
}
function TopNavBar() {
    const value = useContext(AppContext);
    const [state] = value; //Value即为Store
    const { count } = state;
    return (
        <>
            <p>{count}</p>
            <Button />
        </>
    );
}

function Button() {
    const value = useContext(AppContext);
    const [state, dispatch] = value;
    return (
        <div>
            <button type="button" onClick={() => dispatch({ type: "increment" })}>
                Increnment
            </button>
            <button type="button" onClick={() => dispatch({ type: "decrement" })}>
                Decrenment
            </button>
        </div>
    );
}

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
);
