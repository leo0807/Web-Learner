// https://www.nowcoder.com/questionTerminal/6e630519bf86480296d0f1c868d425ad
function detectCycle(head) {
    // write code here
    let cur1 = head,
        cur2 = head;
    while (cur2 !== null && cur2.next !== null) {
        cur1 = cur1.next;
        cur2 = cur2.next.next;
        if (cur1 === cur2) {
            let slow = head;
            while (cur1 != slow) {
                slow = slow.next;
                cur1 = cur1.next;
            }
            return cur1
        }

    }
    return null;
}