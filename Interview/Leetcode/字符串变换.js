// 字符串变形题解
// 第一步先翻转单词顺序，之前看到的有个巧妙的思路，先对整个字符串进行翻转，然后循 环对每个单词进行翻转，就达到了翻转单词顺序的效果，这个时间复杂度为: 因为中间有个while循环，最多循环单词的最大长度，单词长度是常数级别的，所以时间复杂度为o(n)的，
// 第二步遍历字符串，将每个大写变成小写，小写变成大写，时间复杂度为o(n)的

function trans(s, n) {
    //write code here
    if (!n) return s;
    let words = s.split(" "),
        res = [];
    for (let i = words.length - 1; i >= 0; i--) {
        let word = words[i].split("");
        for (let j = 0; j < word.length; j++) {
            if (words[i].charCodeAt(j) < 91 && words[i].charCodeAt(j) > 40) {
                word[j] = word[j].toLowerCase();
            }
            if (words[i].charCodeAt(j) < 123 && words[i].charCodeAt(j) > 96) {
                word[j] = word[j].toUpperCase();
            }
        }
        res.push(word.join(""));
    }
    return res.join(" ")
}