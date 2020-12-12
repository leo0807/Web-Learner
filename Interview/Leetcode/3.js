/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    //     es6的set保存不重复的内容
        const collection = new Set();
    //     获取字符串长度
        const n = s.length;
    //     设置指针
        let pointer = -1;
    // 设置最大不重复长度
        let res = 0;
        for(let i = 0; i < n; i++){
            if(i != 0){
    //             开始下一次循环，说明遇到了重复的元素 需要删除最左边的元素
                collection.delete(s.charAt(i - 1));
            }
            while(pointer + 1 < n && !collection.has(s.charAt(pointer + 1))){
                  collection.add(s.charAt(pointer + 1));
    //               不断移动指针
                  pointer++;
                  }
        res = Math.max(res, pointer - i + 1);
        }
        return res; 
    };