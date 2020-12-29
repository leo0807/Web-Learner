// 给定一个数组arr，返回arr的最长无的重复子串的长度(无重复指的是所有数字都不相同)。
// [2, 2, 3, 4, 3]
// 3
function maxLength(arr) {
    // write code here
    const len = arr.length;
    let left = 0,
        right = 0,
        temp = new Array(100000).fill(0),
        res = 0;
    while (right < len) {
        if (temp[arr[right]] > 0) {
            temp[arr[left]] = 0;
            left++;
        } else {
            temp[arr[right]] = 1;
            const tmp = right - left + 1;
            res = tmp > res ? tmp : res;
            right++;
        }
    }
    return res;
}