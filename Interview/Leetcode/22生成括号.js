function generateParenthesis(n) {
    // write code here
    let res = [];
    dfs(0, 0, n, "", res);
    return res
}
function dfs(left, right, n, s, res) {
    if (s.length === n * 2) {
        res.push(s);
        return;
    }
    if (left < n) {
        dfs(left + 1, right, n, s + "(", res);
    }
    if (right < left) {
        dfs(left, right + 1, n, s + ")", res);
    }
}