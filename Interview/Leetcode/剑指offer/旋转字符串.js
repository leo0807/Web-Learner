function solve(A, B) {
    // write code here
    if (!A || !B || A.length != B.length) return false;
    return (A + A).includes(B);
}

// 字符串旋转:
// 给定两字符串A和B，如果能将A从中间某个位置分割为左右两部分字符串（都不为空串），
// 并将左边的字符串移动到右边字符串后面组成新的字符串可以变为字符串B时返回true。
// 例如：如果A=‘youzan’，B=‘zanyou’，A按‘you’‘zan’切割换位后得到‘zanyou’和B相同返回true。
// "youzan","zanyou"