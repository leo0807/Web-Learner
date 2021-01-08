

var solveSudoku = function (board) {
    // let rows = new Array(9).fill(new Array(10).fill(0)),
    let rows = new Array(9);
    for (let i = 0; i < 9; i++) {
        rows[i] = new Array(10).fill(0);
    }
    let cols = new Array(9);
    for (let i = 0; i < 9; i++) {
        cols[i] = new Array(10).fill(0);
    }
    let boxes = new Array(9);
    for (let i = 0; i < 9; i++) {
        boxes[i] = new Array(10).fill(0);
    }
    // let cols = new Array(9).fill(new Array(10).fill(0)),
    //     boxes = new Array(9).fill(new Array(10).fill(0));

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let c = board[i][j];
            if (c !== '.') {
                let n = parseInt(c),

                    bx = Math.floor(j / 3),
                    by = Math.floor(i / 3);
                //                 0代表为使用，1为使用过
                rows[i][n] = 1;
                console.log(i, n)
                cols[j][n] = 1;
                //                     box索引
                boxes[by * 3 + bx][n] = 1;
            }
        }
    }
    fill(board, 0, 0)
    function fill(board, x, y) {
        //     完成填充条件
        if (y === 9) return true;
        //     下一个点的坐标
        let nx = (x + 1) % 9,
            //         判断进入是否下一行
            ny = (nx === 0) ? y + 1 : y;
        //     如果已经填充，则进入下一个点
        if (board[y][x] !== '.') return fill(board, nx, ny);
        //  没有被填充过
        for (let i = 1; i <= 9; i++) {

            let bx = Math.floor(x / 3),
                by = Math.floor(y / 3),
                box_key = by * 3 + bx;
            if (!rows[y][i] && !cols[x][i] && !boxes[box_key][i]) {
                rows[y][i] = 1;
                cols[x][i] = 1;
                boxes[box_key][i] = 1;
                board[y][x] = i.toString();
                console.log(board[y][x])
                //                 递归向下一个点求解
                if (fill(board, nx, ny)) return true;
                //                 恢复初始状态
                board[y][x] = '.';
                boxes[box_key][i] = 0;
                rows[y][i] = 0;
                cols[x][i] = 0;
            }
        }
        return false;
    }
    console.log(board);
};

const board = [["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]];
solveSudoku(board);