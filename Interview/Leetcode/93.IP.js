var restoreIpAddresses = function (s) {
    let res = [];
    dfs(res, s, [], 0);
    return res;
};

function dfs(results, s, path, start) {
    if (path.length === 4 && start === s.length) {
        results.push(Array.from(path).join("."));
        return;
    }
    if (path.length >= 4 && start < s.length) return;
    for (let i = 1; i <= 3; i++) {
        if (start + i - 1 >= s.length) return;
        if (s[start] == '0' && i != 1) return;
        if (s.substring(start, start + i) > 255) return;
        path.push(s.substring(start, start + i));
        dfs(results, s, path, start + i);
        path.pop();
    }
}
let s = "0000"
console.log(restoreIpAddresses(s));