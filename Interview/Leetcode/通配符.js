/**
 * 
 * @param s string字符串 
 * @param p string字符串 
 * @return bool布尔型
 */
function isMatch(s, p) {
    // write code here
    let lenS = s.length,
        lenP = p.length,
        pPointer = 0,
        sPointer = 0,
        match = 0,
        starSign = -1;
    while (sPointer < lenS) {
        //         一般匹配情况
        if (pPointer < lenP && s[sPointer] === p[pPointer]
            || p[pPointer] === '?') {
            sPointer++;
            pPointer++;
            //             星号匹配
        } else if (pPointer < lenP && p[pPointer] === '*') {
            starSign = pPointer;
            match = sPointer;
            pPointer++;
        } else if (starSign !== -1) {
            //             位置相等于没有变化
            pPointer = starSign + 1;
            match++;
            sPointer = match;
        } else return false;
    }
    while (pPointer < lenP && p[pPointer] === '*') {
        pPointer++;
    }
    return pPointer === lenP;
}
module.exports = {
    isMatch: isMatch
};