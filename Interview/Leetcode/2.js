/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    //     创建新的链表，这个链表即为返回的链表
        let node = new ListNode("head");
    //     作为每次相加的临时节点
        let temp = node;
    //     使用一个变量判断是否进1
        let add = 0;
    //     每次相加的节点是否还有，作为继续循环的判断
        let sum = 0;
        while(l1|| l2){
            sum = (l1? l1.val: 0) + (l2? l2.val: 0) + add;
    //      判断是否需要进位
            add = sum >= 10 ? 1: 0;
            temp.next = new ListNode(sum % 10);
            temp = temp.next;
            l1&&(l1 = l1.next);
            l2&&(l2 = l2.next);
        }
        add&&(temp.next = new ListNode(add));
        return node.next
    };