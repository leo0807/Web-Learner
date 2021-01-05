function longestValidParentheses(s) {
    // write code here
    if (!s.length) return 0;
    let stack = [],
        last = -1,
        res = 0;
    for (let i = 0, len = s.length; i < len; i++) {
        if (s.charAt(i) === '(') {
            stack.push(i)
        } else {
            if (!stack.length) last = i;
            else {
                stack.pop();
                if (stack.length) {
                    res = Math.max(res, i - stack[stack.length - 1]);
                }
                else {
                    // 提取出合法的括号
                    res = Math.max(res, i - last);
                }
            }
        }
    }
    return res;
}
//维护一个栈，里面保存'('的下标，每次进入一个')'时，栈弹出，ans更新为当前扫描的下标
//与栈顶元素之间的距离(因为中间可能有些括号已经被消掉了)，因为栈可能为空，所以需要
//记录下起始记录点last。

