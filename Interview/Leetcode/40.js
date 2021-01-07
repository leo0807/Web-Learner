var combinationSum2 = function (candidates, target) {
    let res = [];
    // prev = ;
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
        //         确保同一层级 不重复
        if (i > level && candidates[i] === candidates[i - 1]) continue;
        temp.push(candidates[i]);
        dfs(results, temp, candidates, target - candidates[i], i + 1);
        temp.pop();
    }
}

// 字典序列 无重复
function Permutation(str) {
    // write code here
    let res = [];
    str = str.split('').sort((a, b) => {
        return a - b;
    });
    dfs(res, str, 0);
    return res.sort();
}
function dfs(results, str, level) {
    if (level === str.length - 1) {
        results.push(str.join(""));
        return;
    }
    for (let i = level, len = str.length; i < len; i++) {
        if (str[i] !== str[level] || i === level) {
            //         [str[i], str[level]] = [str[level], str[i]];
            swap(str, i, level);
            dfs(results, str, level + 1);
            swap(str, level, i);
            //         [str[level], str[i]] = [str[i], str[level]];
        }
        //         if(i > level && str[i] === str[i - 1]) continue;

    }
}
function swap(str, i, j) {
    let tmp = str[i];
    str[i] = str[j];
    str[j] = tmp;
}