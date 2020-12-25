// 深度比较
// 全相等
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
// 判断是否是对象或数组
function isEqual(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) {
        // 值类型
        return obj1 == obj2;
    }
    if (obj1 === obj2) return true;
    // 深度比较 考虑子属性
    // 此时 两个都是对象或数组，且不相等
    // 先取出obj1和obj2的keys，比较个数
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    // 以obj1为基准盲，和obj2依次递归比较
    for (let key in obj1) {
        // 比较当前key的val
        const res = isEqual(obj1[key], obj2[key]);
        if (!res) return false;
    }
    // 全相等
    return true;
}