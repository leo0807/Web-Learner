

function solve(grid) {
    // write code here
    let count = 0;
    if (grid.length === 0) return count;
    const row = grid.length,
        col = grid[0].length;

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === '1') {
                count++;
                // dfs(i, j);
                bfs(grid, i, j);
            }
        }
    }
    return count;
}
function dfs(grid, row, col) {
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

function bfs(grid, row, col) {
    let queue = [[row, col]];
    while (queue.length) {
        let [x, y] = queue.shift();
        grid[x][y] = 0;
        for (let [i, j] of [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]]) {
            if (
                i >= 0 &&
                i < grid.length &&
                j >= 0 &&
                j < grid[0].length &&
                grid[i][j] === '1'
            ) {
                queue.push([i, j]);
            }
        }
    }
}

const m = [['1', '1', '0', '0', '0'], ['0', '1', '0', '1', '1'],
['0', '0', '0', '1', '1'], ['0', '0', '0', '0', '0'], ['0', '0', '1', '1', '1']];
console.log(solve(m));
