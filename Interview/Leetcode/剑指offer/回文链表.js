function isPail(head) {
    // write code here
    let stack = []
    while (head) {
        stack.push(head.val)
        head = head.next;
    }
    const length = stack.length;
    const halfLen = Math.floor(length / 2);
    for (let i = 0; i < halfLen; i++) {
        if (stack[i] !== stack[length - 1 - i]) {
            return false;
        }
    }
    return true;
}