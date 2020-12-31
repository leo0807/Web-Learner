function Print(pRoot) {
    // write code here
    //     even push
    //     odd unshift
    let res = [];
    if (!pRoot) return res;
    let level = 0,
        queue = [[pRoot, level]];
    let order = true;
    while (queue.length !== 0) {
        let [node, level] = queue.shift();
        if (!res[level]) {
            res[level] = [];
        }
        order = level % 2 === 0 ? true : false;
        if (order) {
            res[level].push(node.val);
        } else {
            res[level].unshift(node.val);
        }

        if (node.left) {
            let tmp = level;
            queue.push([node.left, ++tmp]);
        }
        if (node.right) {
            let tmp = level;
            queue.push([node.right, ++tmp]);
        }
    }
    return res;
}