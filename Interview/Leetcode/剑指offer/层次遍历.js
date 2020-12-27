/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
  * 
  * @param root TreeNode类 
  * @return int整型二维数组
  */
function levelOrder(root) {
    // write code here
    if (root === null) return [];
    let res = [];
    countLevel(root, 0);
    function countLevel(root, level) {
        if (root === null) return;
        let queue = res[level];
        if (!queue) {
            queue = res[level] = [];
        }
        queue.push(root.val);
        res[level] = queue;
        if (root.left) countLevel(root.left, level + 1);
        if (root.right) countLevel(root.right, level + 1);
    }
    return res;
}

module.exports = {
    levelOrder: levelOrder
};