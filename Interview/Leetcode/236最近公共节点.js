function lowestCommonAncestor(root, o1, o2) {
    // write code here
    if (!root) return -1;
    if (root.val === o1 || root.val === o2) return root.val;
    let left = lowestCommonAncestor(root.left, o1, o2),
        right = lowestCommonAncestor(root.right, o1, o2);
    if (left === -1) return right;
    if (right === - 1) return left;
    return root.val;
}
function LCA(root, p, q) {
    if (!root || root.val === p || root.val === q) return root;
    let left = LCA(root.left, p, q),
        right = LCA(root.right, p, q);
    // 最有两个子树均找到了值
    // 则公共节点是root
    if (left && right) return root;
    return left ? left : right;
}