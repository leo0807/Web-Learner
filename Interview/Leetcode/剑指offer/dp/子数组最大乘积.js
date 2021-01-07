function maxProduct(arr) {
    // write code here
    let min = arr[0],
        max = arr[0],
        len = arr.length,
        res = arr[0];
    for (let i = 1; i < len; i++) {
        const _min = min;
        min = Math.min(Math.min(arr[i], arr[i] * min), arr[i] * max);
        max = Math.max(Math.max(arr[i], arr[i] * max), arr[i] * _min);
        res = Math.max(res, max);
    }
    return res;
}

