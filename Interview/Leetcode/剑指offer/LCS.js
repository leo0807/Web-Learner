function LCS(str1, str2) {
    // write code here
    const length1 = str1.length;
    const length2 = str2.length;
    let dp = new Array(length1 + 1);
    for (let i = 0; i < length1; i++) {
        dp[i] = new Array(length2 + 1).fill(0);
    }
    let index = 0,
        max = 0;
    for (let i = 0; i < length1; i++) {
        for (let j = 0; j < length2; j++) {
            if (str1.charAt(i) === str2.charAt(j)) {
                dp[i + 1][j + 1] = dp[i][j] + 1;
                if (max < dp[i + 1][j + 1]) {
                    max = dp[i + 1][j + 1];
                    index = i + 1;
                }
            }
        }
    }
    return str1.substring(index - max, index)
}
let str1 = "1AB2345CD",
    str2 = "12345EF";

console.log(LCS(str1, str2));