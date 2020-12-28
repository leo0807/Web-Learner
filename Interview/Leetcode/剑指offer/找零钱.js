function minMoney(arr, aim) {
    // write code here
    const length = arr.length;
    let dp = new Array(aim + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= aim; i++) {
        for (let j = 0; j < length; j++) {
            if (i < arr[j]) continue;
            dp[i] = Math.min(dp[i], dp[i - arr[j]] + 1);
        }
    }
    if (dp[aim] === Infinity) {
        return -1
    } else {
        return dp[aim];
    }
}
// i = 5 => dp[0] = 1,
//          dp[5] = dp[0] + 1
//          dp[10] = dp[5] + 1
//          dp[15] = dp[10] + 1
//          dp[20] = dp[15] + 1