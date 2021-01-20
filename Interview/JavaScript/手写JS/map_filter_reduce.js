function myMap(arr, callbackFunc) {
    if (!Array.isArray(arr) || !arr.length || typeof callbackFunc !== 'function') {
        return [];
    } else {
        let res = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            res.push(callbackFunc(arr[i], i, arr));
        }
        return res;
    }
}

function myFilter(arr, callbackFunc) {
    if (!Array.isArray(arr) || !arr.length || typeof callbackFunc !== 'function') {
        return [];
    } else {
        let res = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            if (callbackFunc(arr[i], i, arr)) { res.push(arr[i]) }
        }
        return res;
    }
}

function myReduce(arr, callbackFunc, initialVal) {
    if (!Array.isArray(arr) || !arr.length || typeof callbackFunc !== 'function') {
        return [];
    } else {
        let hasInitVal = initialVal !== undefined;
        let val = hasInitVal ? initialVal : arr[0];
        for (let i = hasInitVal ? 0 : 1, len = arr.length; i < len; i++) {
            val = callbackFunc(val, arr[i], i, arr);
        }
        return val;
    }
}