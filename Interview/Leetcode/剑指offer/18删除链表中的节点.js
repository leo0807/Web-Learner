
/* 
给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
返回删除后的链表的所有节点值。
*/
// arr数组，val
// [4,5,1,9]
// 使用哨兵节点，循环找到节点，进行删除

function deleteNode(head, value) {
    let res = new ListNode("head");
    res.next = head;
    let node = res;
    while (node) {
        if (node.val === value) {
            node.next = node.next.next;
        }
        node = node.next;
    }
    return res
}