function reConstructBinaryTree(pre, vin) {
    if (!pre.length || !vin.length) {
        return null;
    }

    const rootVal = pre[0];
    const node = new TreeNode(rootVal);

    let i = 0; // i有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
    for (; i < vin.length; ++i) {
        if (vin[i] === rootVal) {
            break;
        }
    }

    node.left = reConstructBinaryTree(pre.slice(1, i + 1), vin.slice(0, i));
    node.right = reConstructBinaryTree(pre.slice(i + 1), vin.slice(i + 1));
    return node;
}

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function reConstructBinaryTree1(pre, vin) {
    // write code here
    if (!pre.length || !vin.length) return null;
    return rebuild(pre, 0, pre.length - 1,
        vin, 0, vin.length - 1);
}
function rebuild(pre, preStart, preEnd, vin, vinStart, vinEnd) {
    if (preStart > preEnd || vinStart > vinEnd) return null;
    let root = new TreeNode(pre[preStart]);
    for (let i = vinStart; i <= vinEnd; i++) {
        //         PreOrder 1 2 4 5 3
        //         InOrder  4 2 5 1 3

        //         i == 3
        if (vin[i] === root.val) {
            root.left = rebuild(pre, preStart + 1, preStart + i - vinStart, //1, 4
                vin, vinStart, i - 1);                    //0, 3
            root.right = rebuild(pre, i - vinStart + preStart + 1, preEnd,      //4, 5
                vin, i + 1, vinEnd);                  //4, 5 
            break;
        }
    }
    console.log(root);
    return root;
}