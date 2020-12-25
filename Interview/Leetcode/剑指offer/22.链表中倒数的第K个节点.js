// 输出倒数第k个节点

function getkthElement(head, k) {
    let stack = [];
    while (head) {
        stack.push(head);
        head = head.next;
    }
    let res = null;
    while (k) {
        res = stack.pop()
        k--;
    }
    return res.val;
}