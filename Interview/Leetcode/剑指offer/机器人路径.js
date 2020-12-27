function uniquePaths(m, n) {
    // write code here
    let arr = new Array(m + 1);
    for (let i = 0; i < m + 1; i++) {
        arr[i] = new Array(n + 1).fill(0);
    }
    arr[0][1] = 1;
    for (let i = 1; i < m + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            arr[i][j] = arr[i - 1][j] + arr[i][j - 1];
        }
    }
    return arr[m][n];
}
console.log(uniquePaths(2, 2));