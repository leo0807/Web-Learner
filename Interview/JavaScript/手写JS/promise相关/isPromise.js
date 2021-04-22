let a = {};
console.log(a instanceof Promise);

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function')
        && typeof obj.then === 'function';
}

