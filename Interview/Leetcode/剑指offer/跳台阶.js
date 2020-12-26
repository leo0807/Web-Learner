function jumpFloor(number) {
    // write code here
    let dp = [];
    dp[0] = dp[1] = 1;
    for (let i = 2; i <= number; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[number]
}

function jumpFloor2(number) {
    // write code here
    if (number === 0 || number === 1) return number;
    let a = 1,
        b = 1,
        c;
    for (let i = 2; i <= number; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return c;

}