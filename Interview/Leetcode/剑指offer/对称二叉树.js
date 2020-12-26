function isSymmetric(root) {
    if (root === null) return true;
    function isSame(root1, root2) {
        if (root1 === null && root2 === null) return true;
        if (root1 === null || root2 === null) return false;
        if (root1.val !== root2.val) return false;
        return isSame(root1.left, root2.right) && isSame(root1.right, root2.left);
    }
    return isSame(root.left, root.right);
}