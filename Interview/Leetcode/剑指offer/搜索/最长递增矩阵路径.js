
// 给定一个矩阵，矩阵内所有数均为非负整数。
// 求一条路径，该路径上所有数是递增的。
// 这个路径必须满足以下条件：
// 1、对于每个单元格，你可以往上，下，左，右四个方向移动。 你不能在对角线方向上移动或移动到边界外。
// 2、你不能走重复的单元格。即每个格子最多只能走一次。

// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// 返回值 5
// 1 -> 2 -> 3 -> 6 -> 9即可。当然这种递增路径不是唯一的。 
function solve(matrix) {
    // write code here
    let row = matrix.length,
        col = matrix[0].length,
        res = 1;
    let dp = new Array(row);
    let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (let i = 0; i < row; i++) {
        dp[i] = new Array(col).fill(0);
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (dp[i][j] === 0) {
                res = Math.max(getLength(i, j), res)
            };
        }
    }
    function getLength(m, n) {
        if (dp[m][n]) return dp[m][n];
        dp[m][n] = 1;
        for (let x of directions) {
            let i = m + x[0],
                j = n + x[1];
            if (i >= 0 && i < row && j >= 0 && j < col &&
                matrix[i][j] > matrix[m][n]) {
                dp[m][n] = Math.max(dp[m][n], 1 + getLength(i, j));
            }
        }
        return dp[m][n];
    }
    return res;
}
