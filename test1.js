function multi(num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";
    // num1 = num1.toString();
    // num2 = num2.toString();
    if (isNaN(num1) || isNaN(num2)) return "";
    var len1 = num1.length,
        len2 = num2.length;

    var ans = [];
    for (var i = len1 - 1; i >= 0; i--) {
        for (var j = len2 - 1; j >= 0; j--) {
            var index1 = i + j;
            var index2 = i + j + 1;
            var mul = num1[i] * num2[j] + (ans[index2] || 0);
            ans[index1] = Math.floor(mul / 10) + (ans[index1] || 0);
            ans[index2] = mul % 10;
        }
    }
    var result = ans.join("");
    return result === 0 ? '0' : result.replace(/^0+/, "");
}

console.log(multi(0, 56));

// function removeDuplicate(s){
//     let s1 = s;
//     let c;
//     let cc = s.match(/(\d)\1+/g);
//     for(let i = 0, len = cc.length; i < len; i++){
//         c = cc[i].substring(0, 1);
//         s1 = s1.replace(cc[i], c);
//     }
//     return s1;
// }
function removeDuplicate(str) {
    if (str === '') return "";
    let result = str[0];
    for (let i = 1, len = str.length; i < len; i++) {
        if (str[i] !== str[i - 1]) {
            result += str[i];
        }
    }
    return result;
}

// console.log(removeDuplicate("12333nfos88juuufbvbvjsm"));

function arrangeWord(str) {
    str = str.charAt(0).toLowerCase() + str.slice(1);
    const strArr = str.split(' ');
    let sorted = strArr.sort((a, b) => {
        return a.length - b.length;
    })
    sorted = sorted.join(' ');
    sorted = sorted.charAt(0).toUpperCase() + sorted.slice(1);
    return sorted;
}

// console.log(arrangeWord("I am a boy"));
// console.log(arrangeWord("Show me the code"));

function maxUncrossedLines(A, B) {
    let m = A.length;
    let n = B.length;
    let dp = [...Array(m + 1)].map(x => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = A[i - 1] == B[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i][j - 1], dp[i - 1][j]);
    return dp[m][n];
};
// let  A = [1,3,5], B = [1,5,3];
// let A = [3,3,2,3,3], B = [1,3,1,2];
// let A = [1,1,2,1], B = [3,3,1];
let A = [1, 4], B = [3, 5];
// console.log(maxUncrossedLines(A, B));

function longestPalindrome(s) {
    if (!s || s.length < 2) {
        return s;
    }
    let start = 0,
        end = 0;
    let len = s.length;
    let centerExpend = (left, right) => {
        while (left >= 0 && right < len && (s[left] === s[right] || s[left] === "*" || s[right] === "*")) {
            left--;
            right++;
        }
        return (right - left) - 1;
    }
    for (let i = 0; i < len; i++) {
        let len1 = centerExpend(i, i);
        let len2 = centerExpend(i, i + 1);
        let maxLen = Math.max(len1, len2);
        if (maxLen > end - start) {
            start = i - ((maxLen - 1) >> 1);
            end = start + maxLen;
        }
    }
    return end - start;
}
let s = "DAB*B*ACD";
console.log(longestPalindrome(s));

function swapChar(s) {
    s = s.split('');
    let tmp = [...s];
    tmp = tmp.sort((a, b) => {
        if (a > b) {
            return 1;
        } else {
            return -1;
        }
    });
    console.log(s);
    let maxChar, minChar;
    while (true) {
        maxChar = tmp[tmp.length - 1],
            minChar = tmp[0]
        if (maxChar > minChar && s.indexOf(maxChar) < s.indexOf(minChar)) {
            [s[s.indexOf(maxChar)], s[s.indexOf(minChar)]] = [s[s.indexOf(minChar)], s[s.indexOf(maxChar)]];
            break;
        } else {
            // tmp.pop();
            tmp.shift();
        }
    }
    return s.join("");

}
let ss = "aaazbcdeadcd";
console.log(swapChar(ss));
