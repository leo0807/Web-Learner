let lastState;

function useState(initialState) {
    lastState = lastState || initialState;
    function setState(newState) {
        lastState = newState;
    }
    return [lastState, setState];
}