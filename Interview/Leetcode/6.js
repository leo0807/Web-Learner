/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    //     如果是一行则直接返回
        if(numRows === 1) return s;
    //     空数组用来保存结果
        const rows = [];
    //     游标变量 保存走到第几行了
        let loc = 0;
    //     判断是在往上走还是在向下走
        let down = false;
        for(let i = 0; i < s.length; i++){
            rows[loc] = (rows[loc]||"") + s[i];
            if(loc === 0 || loc === (numRows - 1)){
                down = !down
            }
            if(down) loc++;
            else loc--;
        }
        return rows.join("");
    };