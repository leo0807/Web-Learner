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


Array.prototype.newMap = function (callback) {
    var T, A, k;
    if (this === null) {
        throw new TypeError('this is null or undefined');
    }
    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }

    if (arguments.length > 1) {
        T = arguments[1];
    }

    A = new Array(len);
    k = 0;
    while (k < len) {
        var kValue, mappedValue;
        // 判断是否有key，没有则略过
        if (k in O) {
            kValue = O[k];
            mappedValue = callback.call(T, kValue, k, O);
            A[k] = mappedValue;
        }
        k++;
    }
    return A;
}

// 使用reduce实现map
Array.prototype.myMap = function (callback) {
    let arr = this,
        res = [];
    return arr.reduce((prev, curr, index, array) => {
        return prev.concat(callback(curr, index, array));
    }, res);
}

let a = [1, 2, 3];
// a.myMap(console.log);
console.log(a.myMap(item => item * 2));

Array.prototype._map = function (fn, thisArg) {
    const result = [];
    this.reduce((prev, curr, index, array) => {
        result[index] = fn.call(thisArg, array[index], index, array);
    }, 0)
    return result;
}

// ————————————————
// 版权声明：本文为CSDN博主「进击的桐人」的原创文章，遵循CC 4.0 BY - SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/romeo12334/article/details/105046767


Array.prototype.mapFunc = function (fn, thisArg) {
    let res = [];
    thisArg = thisArg || [];
    return this.reduce((prev, curr, index, arr) => {
        return prev.concat(fn.call(thisArg, curr, index, arr));
    }, res);
}

