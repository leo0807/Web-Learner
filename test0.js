function FindNumbersWithSum(array, sum) {
    // write code here
    let map = new Map(), res = [], minPair = Infinity;
    const len = array.length;
    for (let i = 0; i < len; i++) {
        if (map.has(sum - array[i])) {
            res.push([array[i], map.get(sum - array[i])]);
        } else {
            map.set(array[i], array[i]);
        }
    }
    let ans = [];
    for (let i of res) {
        console.log(i);
        if (minPair > i[0] * i[1]) {
            minPair = i[0] * i[1];
            ans = [i[0], i[1]];
        }
    }
    if (!ans.length) return [];
    if (ans[0] > ans[1]) {
        [ans[0], ans[1]] = [ans[1], ans[0]];
    }
    return ans;
}

let arr = [1, 2, 4, 7, 11, 16], sum = 10;
console.log(FindNumbersWithSum(arr, sum));