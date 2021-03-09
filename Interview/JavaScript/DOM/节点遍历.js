// 深度优先遍历 递归
let arr = []
function traversalDFSDOM(rootDom) {
    if (!rootDom) return;
    if (rootDom.children.length === 0) {
        //没有孩子节点，表示是个叶子节点，将节点push到数组中
        arr.push(rootDom);
        return;
    }
    // 非叶子节点，添加进入DOM后
    arr.push(rootDom);
    for (let i = 0; i < rootDom.children; i++) {
        // 开始递归children
        traversalDFSDOM(rootDom.children[i]);
    }
}
// 非递归
function traversalDFSDOMIterative(rootDom) {
    if (!rootDom) return;
    let arr = [];
    let stack = [];
    let node = rootDom;
    while (node !== null) {
        arr.push(node);
        if (node.children.length > 0) {
            for (let i = node.length; i >= 0; i--) {
                stack.unshift(node.children[i]);
            }
            node = stack.shift();
        }
    }
}

// BFS 递归

// @ts-ignore
let stack = [rootDom];
function BFSRecurrsion(count) {
    count = count || 0;
    if (stack[count]) {
        let children = stack[count].children;
        for (let i = 0; i < children.length; i++) {
            stack.push(children[i]);
        }
        BFSRecurrsion(++count);
    }
}

// Iterative

function BFSIterative(rootDom) {
    if (!rootDom) return;
    arr.push(rootDom);
    let queue = [rootDom];
    while (queue.length) {
        let node = queue.shift();
        if (!node.children.length) continue;
        for (let i = 0; i < node.children.length; i++) {
            arr.push(node.children[i]);
            queue.push(node.children[i]);
        }
    }
}