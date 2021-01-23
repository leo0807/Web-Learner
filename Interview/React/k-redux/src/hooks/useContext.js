import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

let AppContext = React.createContext();
function useContext(context) {

    return context._currentValue;
}
function Counter() {
    let { state, setState } = useContext(AppContext);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => setState({ number: state.number + 1 })}>+</button>
        </div>
    )
}

function App() {
    let [state, setState] = useState({ number: 0 });
    return (
        <AppContext.Provider value={{ state, setState }}>
            <Counter />
        </AppContext.Provider>
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