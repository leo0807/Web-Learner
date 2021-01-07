// 给定一个由0和1组成的2维矩阵，返回该矩阵中最大的由1组成的正方形的面积
// 示例1
// 输入
// [[1, 0, 1, 0, 0], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 0, 1, 0]]
// 返回值
// 4
function solve(matrix) {
    // write code here
    if (!matrix.length) return 0;
    let row = matrix.length,
        col = matrix[0].length,
        res = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            //            以右下角为基准，如果为1
            //            则寻找其正上，正左和左上的元素是否也为1，
            //            如果是，则可组成正方形
            if (matrix[i][j] == 1 && i != 0 && j != 0) {
                matrix[i][j] = 1 + Math.min(matrix[i - 1][j],
                    matrix[i][j - 1],
                    matrix[i - 1][j - 1]);
            }
            res = Math.max(res, matrix[i][j]);
        }
    }
    return res * res;
}