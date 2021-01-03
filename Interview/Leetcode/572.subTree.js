var isSubtree = function (s, t) {
    // write code here
    let tree1 = preOrder(s, true),
        tree2 = preOrder(t, true);
    return tree1.indexOf(tree2) >= 0;

};
function preOrder(node, left) {
    if (node === null) {
        if (left) return "lnull";
        else return "rnull"
    }
    return '#' + node.val + " " + preOrder(node.left, true) + " " + preOrder(node.right, false);
}

var isSubtree2 = function (s, t) {
    // write code here
    if (!s) return false;
    return isSubtree(s.left, t) || isSubtree(s.right, t) || isSame(s, t);

};
function isSame(node1, node2) {
    if (!node1 && !node2) return true;
    if (!node1 || !node2) return false;
    if (node1.val != node2.val) return false;
    return isSame(node1.left, node2.left) && isSame(node1.right, node2.right);
}