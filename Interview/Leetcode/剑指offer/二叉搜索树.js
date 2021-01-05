function judgeIt(root) {
    // write code here
    return [dfs(root), isComplete(root)];
}
function dfs(root, pre = -Infinity) {
    if (!root) return true;
    if (!dfs(root.left, pre)) return false;
    if (root.val > pre) {
        pre = root.val;
    } else return false;
    return dfs(root.right, pre);
}

function isFullTree(node) {
    if (!node) return true;
    if (!node.left && node.right) return false;
    return isFullTree(node.left) && isFullTree(node.right);
}

function isComplete(root) {
    if (!root) return;
    let queue = [root],
        getNull = false;
    while (queue.length) {
        const len = queue.length;
        for (let i = 0; i < len; i++) {
            let node = queue.shift();
            if (!node.left) { getNull = true; }
            else {
                if (getNull) return false;
                else queue.push(node.left);
            }
            if (!node.right) { getNull = true; }
            else {
                if (getNull) return false;
                else queue.push(node.right);
            }
        }
    }
    return true;
}
function isBST1(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return isBST1(root.left, min, root.val) && isBST1(root.right, root.val, max)
}
function isBST2(root) {
    if (!root) return true;
    if (root.left) {
        if (root.left.val > root.val) return false;
        if (root.left.right && root.left.right > root.val) return false;
    }
    if (root.right) {
        if (root.right < root.val) return false;
        if (root.right.left && root.right.left < root.val) return false;
    }
    return isBST2(root.left) && isBST2(root.right);
}