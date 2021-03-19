function unique(arr) {
    const res = [];
    arr.forEach(item => {
        if (res.indexOf(item) < 0) res.push(item);
    })
    return res;
}
// Set 
function newUnique(arr) {
    const res = new Set(arr);
    return [...res];
}

function removeDuplicate1(arr) {
    let res = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        let flag = true;
        for (let j = 0, len = res.length; j < len; j++) {
            if (arr[i] === res[j]) flag = false;
        }
        flag && res.push(arr[i]);
    }
}

function deepClone(obj = {}) {
    if (typeof obj !== 'object' || obj == null) return obj;
    let result;
    if (obj instanceof Array) {
        result = [];
    } else {
        result = {};
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 保证key不是原型属性

            // 递归调用
            result[key] = deepClone(obj[key]);
        }
    }
    return result;
}