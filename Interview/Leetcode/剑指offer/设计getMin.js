/**
 * return a array which include all ans for op3
 * @param op int整型二维数组 operator
 * @return int整型一维数组
 */
function getMinStack(op) {
    // write code here
    let stack = [],
        res = [], min = [];
    for (let i of op) {
        const [operation, val] = i;
        switch (operation) {
            case 1:
                stack.push(val);
                if (min.length === 0 || val < min[min.length - 1]) min.push(val);
                break;
            case 2:
                let tmp = stack.pop();
                if (tmp === min[min.length - 1]) min.pop();
                break;
            case 3:
                res.push(min[min.length - 1]);
                break;
        }
    }
    return res;
}