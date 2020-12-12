/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    //     将出现过的数字及其索引保存到一个控对象
        let preNums = {};
        
        for(let i = 0; i < nums.length; i++){
            const curNum = nums[i];
            const curTargetNum = target - curNum;
    //       查看能否从preNums中获取到targetNum的索引值
            const index = preNums[curTargetNum];
            if(index === undefined){
    //             没有找到，则将该组合添加到preNums中
                preNums[curNum] = i;
            }else{
                return [index, i];
            }
        }
        
    };