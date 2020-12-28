function minPathSum(matrix) {
    // write code here
    const m = matrix.length;
    const n = matrix[0].length;
    let dp = new Array(m);
    for (let i = 0; i < m + 1; i++) {
        dp[i] = new Array(n + 1).fill(Infinity);
    }
    dp[0][1] = dp[1][0] = 0

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // console.log(matrix[i + 1][j]);
            dp[i + 1][j + 1] = Math.min(dp[i + 1][j], dp[i][j + 1]) +
                matrix[i][j];
        }
    }
    console.log(dp);
    return dp[m][n];
}
const m = [[1, 3, 5, 9], [8, 1, 3, 4], [5, 0, 6, 1], [8, 8, 4, 0]];
console.log(minPathSum(m));