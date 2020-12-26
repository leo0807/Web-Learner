// 二叉树的镜像
function Mirror(root) {
    if (!root) return null;
    let temp = root.left;
    root.left = Mirror(root.right);
    root.right = Mirror(temp);
    return root;
}