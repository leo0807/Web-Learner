// 实现add(1)(2)(3)(4) = 10
// 实现add(1, 2, 3)(2) = 9
function add() {
    // 将传入的不定参数转为数组对象
    // 相当于arguments.slice
    let _args = Array.prototype.slice.call(arguments);
    // 因为函数要不断调用 所以要返回一个函数
    let _add = function () {
        _args.push(...arguments);
        // console.log(2);
        return _add;
    }
    // toString 隐形转换
    _add.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        },0)
    }
    return _add;
}
console.log(add(1, 3)(2));
