function IsBalanced_Solution(pRoot) {
    // write code here
    if (!pRoot) return true;
    if (getHeight(pRoot) === -1) return false;
    return true;
}
function getHeight(root) {
    if (!root) return 0;
    let leftHeight = getHeight(root.left),
        rightHeight = getHeight(root.right);
    if (leftHeight === -1 || rightHeight === -1) return -1;
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;
    return Math.max(leftHeight, rightHeight) + 1;
}