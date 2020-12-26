/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

function hasPathSum(root, sum) {
    // write code here
    if (root === null) return false;
    if (root.left === null && root.right === null) {
        if (root.val === sum) return true;
        else return false;
    }
    let leftSide = hasPathSum(root.left, sum - root.val);
    let rightSide = hasPathSum(root.right, sum - root.val);
    let res = leftSide || rightSide;
    return res
}
function hasPathSum2(root, sum) {
    // write code here
    if (root === null) return false;
    function findPath(root, sum, temp) {
        if (!root) return false;
        temp += root.val;
        if (temp === sum && !root.left && !root.right) {
            return true;
        }
        return findPath(root.left, sum, temp) || findPath(root.right, sum, temp);
    }
    return findPath(root, sum, 0);
}