function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function sortedArrayToBST(num) {
    // write code here
    return build(num, 0, num.length - 1);
}
function build(arr, left, right) {
    if (left > right) return null;
    const mid = Math.floor((left + right + 1) / 2);
    let root = new TreeNode(arr[mid]);
    root.left = build(arr, left, mid - 1);
    root.right = build(arr, mid + 1, right);
    return root;
}
function sortedArrayToBST1(num) {
    if (!num.length) return null;
    let mid = Math.floor(num.length / 2);
    let node = new TreeNode(num[mid]);
    node.left = sortedArrayToBST(num.slice(0, mid))
    node.right = sortedArrayToBST(num.slice(mid + 1));
    return node;
}