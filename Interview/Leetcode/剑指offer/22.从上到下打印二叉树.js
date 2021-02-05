// 从上往下打印出二叉树的每个节点，同层节点从左至右打印。
// 示例1
// 输入
// { 5, 4,#, 3,#, 2,#, 1 }
// 返回值
// [5, 4, 3, 2, 1]

function PrintFromTopToBottom(root) {
    // write code here
    let res = [],
        queue = [root];
    while (queue.length) {
        let node = queue.pop();
        res.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return res;
}