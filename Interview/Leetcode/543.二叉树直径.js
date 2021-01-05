var diameterOfBinaryTree = function (root) {
    let max = 0;
    if (!root) return 0;
    function dfs(node) {
        if (!node) return 0;
        let left = dfs(node.left),
            right = dfs(node.right);
        // 有可能子树的直径已经超过根节点的直径
        max = Math.max(left + right, max);
        return Math.max(left, right) + 1;
    }
    dfs(root);
    return max;
};
//直径就是树中任意两个最短点的最大距离