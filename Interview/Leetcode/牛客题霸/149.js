// 给你一个非空模板串S，一个文本串T，问S在T中出现了多少次
// 示例1
// 输入
// "ababab", "abababab"
// 返回值
// 2

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 计算模板串S在文本串T中出现了多少次
 * @param S string字符串 模板串
 * @param T string字符串 文本串
 * @return int整型
 */
function kmp(S, T) {
    // write code here
    let res = 0,
        sLen = S.length,
        tlen = T.length;
    for (let i = 0; i < tlen; i++) {
        if (T.slice(i, i + sLen) === S) res++;
    }
    return res;
}