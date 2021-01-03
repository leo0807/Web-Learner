function permute(num) {
    // write code here
    let res = [];
    dfs(res, num, 0);
    return res;
}
function dfs(res, num, idx) {
    if (idx === num.length - 1) { res.push(num); return; };
    for (let i = idx; i < num.length; i++) {
        [num[i], num[idx]] = [num[idx], num[i]];
        dfs(res, num, idx + 1);
        [num[idx], num[i]] = [num[i], num[idx]];
    }
}