

function solve(grid) {
    // write code here
    let count = 0;
    if (grid.length === 0) return count;
    const row = grid.length,
        col = grid[0].length;

    function dfs(row, col) {
        if (row < 0 || row >= grid.length || col < 0
            || col >= grid[0].length
            || grid[row][col] === '0') {
            return;
        }
        grid[row][col] = '0';
        dfs(row + 1, col);
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row, col - 1);
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    return count;
}

const m = [['1', '1', '0', '0', '0'], ['0', '1', '0', '1', '1'],
['0', '0', '0', '1', '1'], ['0', '0', '0', '0', '0'], ['0', '0', '1', '1', '1']];
console.log(solve(m));
