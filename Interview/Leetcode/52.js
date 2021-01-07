let col = new Map(),
    dir1 = new Map(),
    dir2 = new Map();

function Nqueen(n) {
    // write code here
    let res = 0;
    dfs(0);
    function dfs(row) {
        //         console.log(row)
        if (row === n) {
            res++;
            return;
        }
        for (let i = 0; i < n; i++) {
            if (!col.has(i) && !dir1.has(i - row) && !dir2.has(i + row)) {
                col.set(i, 1);
                dir1.set(i - row, 1);
                dir2.set(i + row, 1);
                dfs(row + 1);
                col.delete(i);
                dir1.delete(i - row);
                dir2.delete(i + row);
            }

        }
    }
    return res;
}
// 行 - 列 = 斜线
