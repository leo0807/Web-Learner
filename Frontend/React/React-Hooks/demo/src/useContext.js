import React, { useState, useContext, createContext } from 'react';

const CountContext = createContext();

function SubComponent() {
    let count = useContext(CountContext)
    return (
        <h1>COUNTS: {count}</h1>
    )
}

function useContext() {
    
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You picked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}> Clicl Me </button>
            <CountContext.Provider value={count}>
                <SubComponent />
            </CountContext.Provider>
        </div>
    )
}

export default useContext
