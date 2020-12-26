function threeOrders(root) {
    // write code here
    // 先序：根左右
    // 中序：左根右
    // 后序：左右根
    let preOrder = [],
        inOrder = [],
        postOrder = [];
    function find(root) {
        if (!root) return null;
        preOrder.push(root.val);
        find(root.left);
        inOrder.push(root.val);
        find(root.right);
        postOrder.push(root.val);
    }
    find(root);
    return [preOrder, inOrder, postOrder];
}