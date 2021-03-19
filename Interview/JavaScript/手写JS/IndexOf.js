function strIndexOf(str, a, start = 0) {
    if (start < 0) start += str.length;
    if (start >= str.length) return -1;
    for (let i = start, len = str.length; i < len; i++) {
        if (str[i] === a) return i;
    }
    return -1;
}

function myIndexOf(str, searchStr, fromIndex = 0) {
    let regex = new RegExp(`${searchStr}`, 'ig');
    regex.lastIndex = fromIndex;
    let result = regex.exec(str);
    return result ? result.index : -1;
}

function myIndexOf2(arr, elem, fromIndex = 0) {
    if (!elem) return - 1;
    for (let i = fromIndex, len = arr.length; i < len; i++) {
        if (arr[i] === elem) return i;
    }
    return -1;
}

function IndexOf(items, item, fromIndex = 0) {
    let isArray = Array.isArray(items);
    let isStr = Object.prototype.toString.call(items) === '[object String]';
    if (!isArray && !isStr) throw new SyntaxError();
    if (isArray) return myIndexOf(items, item, fromIndex);
    else return myIndexOf2(items, item, fromIndex);
}