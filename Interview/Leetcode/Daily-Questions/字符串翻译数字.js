function solve(nums) {
    // write code here
    if (nums.length === 0 || nums.charAt(0) === '0') return 0;
    const len = nums.length;
    let dp = new Array(len + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i < len; i++) {
        dp[i] = dp[i - 1];
        if (nums.charAt(i) === '0') {
            if (nums.charAt(i - 1) === '0') {
                return 0
            }
        } else {
            let temp = parseInt(nums.charAt(i - 1)) * 10 + parseInt(nums.charAt(i));
            if (temp <= 26 && temp >= 10) {
                if (i === 1) {
                    dp[i] += 1;
                } else {
                    dp[i] += dp[i - 2];
                }
            }
        }
    }
    return dp[len - 1];
}
// 题目描述
// 有一种将字母编码成数字的方式：'a'->1, 'b->2', ... , 'z->26'。

// 现在给一串数字，返回有多少种可能的译码结果
// 示例1
// "12"
// 2
console.log(solve("10"));