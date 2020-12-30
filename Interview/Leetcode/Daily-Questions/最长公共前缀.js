function longestCommonPrefix(strs) {
    // write code here
    if (strs.length == 0) return '';
    const len1 = strs[0].length,
        len2 = strs.length;
    let res = [];
    for (let i = 0; i < len1; i++) {
        let temp = strs[0].charAt(i);
        for (let j = 0; j < len2; j++) {
            if (strs[j][i] !== temp) {
                return res.join("");
            }
        }
        res.push(temp);
    }
    return res.join("")
}
let strs = ["abca", "abc", "abca", "abc", "abcc"];
console.log(longestCommonPrefix([]));