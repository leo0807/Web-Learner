/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    //     字符串不能为空
        if(!s||s.length === 0) return "";
        let res = s[0];
        const dp = [];
        
        for(let i = s.length - 1; i >= 0; i--){
            dp[i] = [];
            for(let j = i; j < s.length; j++){
                if(j - i === 0){
                    dp[i][j] = true;
                }else if(j - i === 1 && s[i] === s[j]){
                    dp[i][j] = true;
    //                 内部也是回文字符的情况下
                }else if(s[i] === s[j] && dp[i + 1][j - 1]){
                    dp[i][j] = true;
                }
                if(dp[i][j] && (j - i + 1 > res.length)){
                    res = s.slice(i, j + 1);
                }
            }
        }
        return res;
    };