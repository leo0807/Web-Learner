// 从右上角开始找，左边的都是比它小的，下边的都是比它大的。
// 如果当前元素等于target，那么说明找到了，返回true；
// 如果当前元素大于target，那么当前元素下面的一定都比target大，所以左移；
// 如果当前元素小于target，那么当前元素左面的一定都比target小，所以下移；
// 如果最后没返回true，则返回false。

function searchMatrix(matrix, target) {
    // write code here
    const m = matrix.length;
    const n = matrix[0].length;
    let i = 0,
        j = n - 1;
    while (i < m && j >= 0) {
        if (matrix[i][j] === target) {
            return true;
        } else if (matrix[i][j] > target) {
            j--;
        } else {
            i++;
        }
    }
    return false;
}




function searchMatrix1(matrix, target) {
    // write code here
    const m = matrix.length;
    const n = matrix[0].length;
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] <= target && matrix[i][n - 1] >= target) {
            console.log(1);
            let left = 0,
                right = n - 1;
            while (left <= right) {
                let mid = Math.floor((left + right) / 2);
                if (matrix[i][mid] < target) {
                    left = mid + 1;
                } else if (matrix[i][mid] > target) {
                    right = mid;
                } else {
                    return true;
                }
            }
        }
    }
    return false;
}
const m = [
    [1, 3, 5, 9],
    [10, 11, 12, 30],
    [230, 300, 350, 500]
];

console.log(searchMatrix(m, 3));