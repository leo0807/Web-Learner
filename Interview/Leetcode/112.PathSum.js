var hasPathSum = function (root, sum) {
    let res = [];
    if (!root) return res;
    let queue = [[root, [], 0]];
    while (queue.length) {
        let [node, path, curVal] = queue.shift();
        const tmp = [...path, node.val];
        curVal += node.val;
        if (node.left === null && node.right === null) {
            console.log(1)
            if (curVal == sum) {
                res.push(tmp);
            }
        } else {
            if (node.right) {
                queue.push([node.right, tmp, curVal]);
            }
            if (node.left) {
                queue.push([node.left, tmp, curVal]);
            }
        }
    }
    return res;
};

function pathSum(root, sum) {
    // write code here
    let res = [];
    if (!root) return res;
    dfs(root, [], sum, res);
    return res;
}
function dfs(node, path, sum, res) {
    if (!node) return;
    sum -= node.val
    const tmp = [...path, node.val];
    if (!node.left && !node.right && sum === 0) {
        res.push(tmp);
    }
    node.left && dfs(node.left, tmp, sum, res);
    node.right && dfs(node.right, tmp, sum, res);
}