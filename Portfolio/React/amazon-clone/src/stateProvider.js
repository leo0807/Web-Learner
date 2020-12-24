import React, { createContext, useContext, useReducer } from 'react';
// Prepares the data layer
export const StateContext = createContext();
// Wrap app and then provide the data to other components
export const StateProvider = ({ initialState, reducer, children }) => (
    < StateContext.Provider value={useReducer(reducer, initialState)} >
        {children}
    </StateContext.Provider >
)
// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
