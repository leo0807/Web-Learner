// 来源：https://blog.csdn.net/hustzw07/article/details/72312329
// 1. callee
// 递归
// 我们可能用到一些函数调用自身，即递归。下面是一个计算阶乘的。

function factorial(x) {
    return x <= 1 ? 1 : x * factorial(x - 1);
}
// 运行后发现它很好的完成了我们的要求。可是还是存在一个问题，万一哪天有人重构这个函数改了函数名呢？修改不方便甚至漏改。
// arguments.callee
// 使用callee 避免hard code 函数名。
function factorial(x) {
    return x <= 1 ? 1 : x * arguments.callee(x - 1);
}
// callee是arguments对象的一个属性，指向 arguments 对象的函数，即当前函数。在例子中是XX。

// 2. caller
// 函数对象的一个属性，指向调用当前函数的函数。比如 A() 调用 B() ， 则在B()中 B.caller 指向A() 。
function B() {
    console.log(B.caller);
}

(function A() {
    B()
})()
// 显然，只有当函数被调用时，该属性才会有值。不过当函数被全局调用时，该属性为null。

// 3. callee和caller结合
// 我们刚才在函数B() 中使用了 B.caller 。跟上面递归一样，将来如果有人重构改了函数名呢？ 下面用刚才说的 arguments.callee 替换。
function B() {
    console.log(arguments.callee.caller);
}
// 到这是不是好多了。再执行A() ，发现跟刚才的输出一样。
// 斐波那契
// 递归中最常见的就是斐波那契数列了。
// 问题： 如果一对兔子每月生一对兔子；一对新生兔，从第二个月起就开始生兔子；假定每对兔子都是一雌一雄，试问一对兔子，第n个月能繁殖成多少对兔子？
// 下面用callee 实现：
function fib(nMonth) {
    return nMonth <= 2 ? 1 : arguments.callee(nMonth - 1) + arguments.callee(nMonth - 2)
}
console.log(fib(10))
// 经过测试，输出了我们期待的结果。只是该实现没有保存中间计算结果，性能很慢。有兴趣的话可以自己实现一下。
function fib(nMonth) {
    var tempResult = [];
    if (nMonth <= 2) {
        return 1
    } else {
        if (tempResult[nMonth] > 0) {
            return tempResult[nMonth]
        } else {
            tempResult[nMonth] = arguments.callee(nMonth - 1) + arguments.callee(nMonth - 2)
            return tempResult[nMonth]
        }
    }
}
// 递归是从大往小分解问题，循环则是反方向算法。
// 箭头函数
// 我们知道 ES6 新特性中引入了箭头函数。比如：
var sum = (num1, num2) => num1 + num2;
// 等同于
var sum2 = function (num1, num2) {
    return num1 + num2;
};
// 验证
console.assert(sum(1, 2) == 3)
// 现在问题来了，箭头函数中this作用域跟函数外是一致的，且没有 arguments 对象。
// 而上面我们都是从 arguments 中获取 callee 的。因此在箭头函数中，上述使用是失效的。

// var sum3 = () => console.log(arguments);
// Uncaught ReferenceError: arguments is not defined
