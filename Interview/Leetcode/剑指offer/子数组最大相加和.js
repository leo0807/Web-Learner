function maxsumofSubarray(arr) {
    // write code here
    let maxValue = -Infinity;
    let cur = 0;
    for (let i of arr) {
        cur += i;
        maxValue = Math.max(maxValue, cur);
        cur = cur < 0 ? 0 : cur;
    }
    return maxValue;
}