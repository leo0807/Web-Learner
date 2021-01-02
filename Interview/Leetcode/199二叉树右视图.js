var rightSideView = function (root) {
    let res = [];
    function dfs(node, res, depth) {
        if (!node) return;
        if (depth === res.length) {
            res.push(node.val);
        }
        dfs(node.right, res, depth + 1);
        dfs(node.left, res, depth + 1);
    }
    dfs(root, res, 0);
    return res;
};

// BFS
var rightSideView1 = function (root) {
    let res = [],
        queue = [root];
    if (!root) {
        return res;
    }
    while (queue.length) {
        const len = queue.length;
        for (let i = 0; i < len; i++) {
            let curNode = queue.shift();
            if (i === len - 1) {
                res.push(curNode.val);
            }
            if (curNode.left) {
                queue.push(curNode.left);
            }
            if (curNode.right) {
                queue.push(curNode.right);
            }
        }

    }
    return res;
};
