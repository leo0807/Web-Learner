// 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
// 示例：
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4

function mergeTwoList(node1, node2) {
    if (node1 === null) return node2;
    if (node2 === null) return node1;

    let dummyNode = new ListNode("head");
    let currentNode = dummyNode;
    while (node1 !== null && node2 !== null) {
        if (node1.val < node2.val) {
            currentNode.next = node1;
            node1 = node1.next;
        } else {
            currentNode.next = node2;
            node2 = node2.next;
        }
        currentNode = currentNode.next;
    }
    currentNode.next = node1 === null ? node : node1;
    return dummyNode.next;

}