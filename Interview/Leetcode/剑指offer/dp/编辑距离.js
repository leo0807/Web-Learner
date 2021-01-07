var minDistance = function (str1, str2) {
    let len1 = str1.length,
        len2 = str2.length,
        dp = new Array(len1 + 1);
    for (let i = 0; i < len1 + 1; i++) {
        dp[i] = new Array(len2 + 1).fill(0);
    }
    console.log(dp)
    for (let j = 0; j <= len2; j++) {
        console.log(dp[j][0]);
        dp[j][0] = 1
    };
    for (let i = 0; i <= len1; i++) dp[0][i] = 1;

    dp[0][0] = 0;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + 1)
            }
        }
    }
    return dp[len1][len2]
};
console.log(minDistance("", "a"));