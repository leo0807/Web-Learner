// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 示例 1:
// 输入: [2,2,1]
// 输出: 1
// 示例 2：
// 输入: [4,1,2,1,2]
// 输出: 4
function singleNumber(nums) {
    let res = 0;
    for (let i of nums) {
        res ^= i;
    }
    return res;
}
const arr = [4, 1, 2, 1, 2];
let res = singleNumber(arr);
console.log(res);
// 第二种方法 使用Set
function setSingleNumber(nums) {
    let set = new Set();
    for (let i of nums) {
        if (set.has(i)) {
            set.delete(i);
        } else {
            set.add(i);
        }
    }
    return set;
}
let res1 = setSingleNumber(arr);
console.log(res1);

function FindNumsAppearOnce(array) {
    // write code here
    // return list, 比如[a,b]，其中ab是出现一次的两个数字
    let map = new Map();
    for (let i of array) {
        if (map.has(i)) {
            map.set(i, 2);
        } else {
            map.set(i, 1);
        }
    }
    console.log(map.keys());
    let res = [];
    map.forEach((value, key) => {
        if (value === 1) {
            res.push(key)
        }
    })
    return res;
}

console.log(FindNumsAppearOnce([0, 0, 1, 1, 2, 3, 3, 4, 5, 5, 6, 6]));