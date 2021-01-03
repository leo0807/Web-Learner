function findError(root) {
    // write code here
    if (!root) return [];
    let res = [],
        r1, r2, sign = true;
    inOrder(root, res);
    for (let i = 0, len = res.length; i < len - 1; i++) {
        if (sign && res[i] > res[i + 1]) {
            r1 = res[i];
            sign = false;
            continue;
        }
        if (!sign && res[i] > res[i + 1]) {
            r2 = res[i + 1];
            break;
        }
    }
    return r1 < r2 ? [r1, r2] : [r2, r1];
}
function inOrder(node, res) {
    if (!node) return;
    inOrder(node.left, res);
    res.push(node.val);
    inOrder(node.right, res);
}