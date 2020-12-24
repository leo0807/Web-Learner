// 位运算
// 统计输入数字二进制的1的个数
function countOne(num) {
    let count = 0;
    while (num !== 0) {
        count += num & 1;
        num >>= 1;
    }
    return count;
}
console.log(countOne(15));