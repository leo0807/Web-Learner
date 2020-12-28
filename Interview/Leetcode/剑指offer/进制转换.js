/**
 * 进制转换
 * @param M int整型 给定整数
 * @param N int整型 转换到的进制
 * @return string字符串
 */
function solve(M, N) {
    // write code here
    if (M === 0) return "0";
    let s = "0123456789ABCDEF";
    let res = "",
        negative = false;
    if (M < 0) {
        negative = true;
        M = -M;
    }
    while (M != 0) {
        res += s.charAt(M % N);
        M /= N;
    }
    res = res.split('').reverse()
    while (res[0] === '0') {
        res.shift()
    }
    res = negative ? "-" + res.join('') : res.join('');
    return res;
}
console.log(solve(-7, 2));