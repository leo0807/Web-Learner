var inorderTraversal = function (root) {
    if (!root) return null;
    let res = [],
        curr = root,
        stack = [];
    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        res.push(curr.val);
        curr = curr.right;
    }
    return res;
};