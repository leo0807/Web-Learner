// 实现add(1)(2)(3)(4) = 10
// 实现add(1, 2, 3)(2) = 9
function add() {
    // aruguments是对象
    // 将传入的不定参数转为数组对象
    // 相当于arguments.slice
    let _args = Array.prototype.slice.call(arguments);
    // 因为函数要不断调用 所以要返回一个函数
    let _add = function () {
        _args.push(...arguments);
        // 使用递归，自己不断调用自己
        return _add;
    }
    // 因为内部函数已经返回内部函数 无法返回结果到外部
    // toString 隐形转换
    // 返回到外部到是一个被toString自动转换过到字符串
    // 所以重写toString

    // 用递归返回函数，内部函数在被隐式转换之前本来就是一个函数
    // 并没有实际性到返回任何字符串或数值
    _add.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        })
    }
    return _add;
}
let x = add(1, 3)(2)
console.log(x.toString());


function curry(fn, args) {
    let length = fn.length;
    args = args || [];
    return function () {
        let _args = args.slice(0),
            arg, i;

        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            _args.push(arg);
        }

        if (_args.length < length) {
            return curry.call(this, fn, _args);
        } else {
            return fn.apply(this, _args);
        }
    }
}

var fn = curry(function (a, b, c) {
    console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]