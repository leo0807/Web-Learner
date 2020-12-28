/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    // write code here
    if (head == null || head.next == null) return head;
    let slow = head,
        fast = head.next;

    //使用快慢指针找到中点
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    //分割为两个链表
    let newList = slow.next;
    slow.next = null;
    //将两个链表继续分割;
    let left = sortList(head),
        right = sortList(newList);
    let lhead = new ListNode("head"),
        res = lhead;
    //     归并排序
    while (left != null && right != null) {
        if (left.val < right.val) {
            lhead.next = left;
            left = left.next
        } else {
            lhead.next = right;
            right = right.next;
        }
        lhead = lhead.next;
    }
    lhead.next = left === null ? right : left;
    return res.next;
};