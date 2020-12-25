function getIntersectionNode(headA, headB) {
    let curA = headA;
    let curB = headB
    while (curA !== curB) {
        curA = curA !== curB ? curA.next : curB;
        curB = curA !== curB ? curB.next : curA;
    }
    return curA;
}

