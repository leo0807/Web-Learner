/**
  * 
  * @param S string字符串 
  * @param T string字符串 
  * @return string字符串
  */
function minWindow(S, T) {
    // write code here
    let map = {}, count = T.length, start = 0, end = 0,
        res = Infinity, head, len = S.length;
    for (let i of T) {
        map[i] = map[i] === undefined ? 1 : map[i] + 1;
    }
    while (end < len) {
        if (map[S[end]] !== undefined) {
            if (map[S[end]] > 0) count--;
            map[S[end]]--;
        }
        end++;
        while (count === 0) {
            let left = end - start;
            if (res > left) {
                res = left;
                head = start;
            }
            if (map[S[start]] !== undefined) {
                if (map[S[start]] === 0) count++;
                map[S[start]]++;
            }
            start++;
        }
    }
    return res === Infinity ? '' : S.slice(head, head + res);
}
const m = "XDOYEZODEYXNZ",
    n = "XYZX";
console.log(minWindow(m, n));