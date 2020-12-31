function mergeKLists(lists) {
    if (lists.length == 0) return;
    function merge(left, right) {
        if (left === right) return lists[left];
        let mid = (left + right) >> 1,
            left1 = merge(left, mid),
            right1 = merge(mid + 1, right);
        return mergeTwoLists(left1, right1)
    }
    return merge(0, lists.length - 1)
}
function mergeTwoLists(left, right) {
    if (!left) return right;
    if (!right) return left;
    if (left.val < right.val) {
        left.next = mergeTwoLists(left.next, right);
        return left;
    } else {
        right.next = mergeTwoLists(left, right.next);
        return right;
    }
}