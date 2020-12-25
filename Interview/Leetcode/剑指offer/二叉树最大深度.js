// 递归

function maxDepth(root) {
    if (root === null) return 0;
    let leftDepth = maxDepth(root.left);
    let righDepth = maxDepth(root.right);
    return Math.max(leftDepth, righDepth) + 1;
}