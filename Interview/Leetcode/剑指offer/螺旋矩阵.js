function spiralOrder(matrix) {
    // write code here
    if (matrix.length === 0) return [];
    let top = 0,
        bottom = matrix.length - 1,
        left = 0,
        right = matrix[0].length - 1,
        direction = "right",
        res = [];
    while (left <= right && top <= bottom) {
        if (direction === "right") {
            for (let i = left; i <= right; i++) {
                res.push(matrix[top][i]);
            }
            top++;
            direction = "down";
        }
        else if (direction = "down") {
            for (let i = top; i <= bottom; i++) {
                res.push(matrix[i][right]);
            }
            right--;
            direction = "left";
        }
        else if (direction = "left") {
            for (let i = right; i >= left; i--) {
                res.push(matrix[bottom][i]);
            }
            bottom--;
            direction = "top";
        }
        else if (direction === "top") {
            for (let i = bottom; i >= top; i--) {
                res.push(matrix[i][left]);
            }
            left++;
            direction = "right";
        }
    }
    return res;
}
const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log(spiralOrder(m));