var combinationSum = function (candidates, target) {
    let res = [];
    candidates.sort((a, b) => {
        return a - b;
    })
    dfs(res, [], candidates, target, 0);
    return res;
};
function dfs(results, temp, candidates, target, level) {
    if (target === 0) {
        results.push([...temp]);
        return;
    }
    for (let i = level; i < candidates.length && target - candidates[i] >= 0; i++) {
        temp.push(candidates[i]);
        dfs(results, temp, candidates, target - candidates[i], i);
        temp.pop();
    }
}