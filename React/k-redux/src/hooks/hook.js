import React from 'react';
let lastState;
function useState(initialState) {
    lastState = lastState || initialState;
    function setState(newState) {
        lastState = newState;
        return lastState;
    }
    return [lastState, setState];
}
function hook() {
    return (
        <div>

        </div>
    )
}

export default hook
