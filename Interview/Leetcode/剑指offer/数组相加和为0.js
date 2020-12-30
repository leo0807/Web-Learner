/**
 * 
 * @param num int整型一维数组 
 * @return int整型二维数组
 */
function threeSum(num) {
    // write code here
    if (num.length < 3) return [];
    let res = [],
        len = num.length,
        left = 0,
        right = len - 1;
    num.sort((a, b) => {
        return a - b;
    })
    for (let i = 0; i < len; i++) {
        if (i != 0 && num[i] == num[i - 1]) continue;
        left = i + 1;
        right = len - 1;
        while (left < right) {
            if (num[i] + num[left] + num[right] === 0) {
                let temp = [num[i], num[left], num[right]];
                res.push(temp);
                left++;
                while (left < right && num[left] === num[left - 1]) left++;
            } else if (num[i] + num[left] + num[right] < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return res;
}

// 给出一个有n个元素的数组S，S中是否有元素a,b,c满足a+b+c=0？找出数组S中所有满足条件的三元组。
// 注意：
// 三元组（a、b、c）中的元素必须按非降序排列。（即a≤b≤c）
// 解集中不能包含重复的三元组。
// 例如，给定的数组 S = {-10 0 10 20 -10 -40},解集为(-10, 0, 10) (-10, -10, 20)