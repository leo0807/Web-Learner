来源：https://zhuanlan.zhihu.com/p/115112361

1. generator
整个 generator 函数就是一个封装的异步任务，异步操作需要暂停的地方，都用 yield 语句注明。generator 函数的执行方法如下：
```
function* gen(x) {
    console.log('start')
    const y = yield x * 2
    return y
}

const g = gen(1)
g.next() // start { value: 2, done: false }
g.next(4) // { value: 4, done: true }
```
- gen()​ 不会立即执行，而是一上来就暂停，返回一个 ​Iterator ​ 对象（具体可以参考 Iterator 遍历器）
- 每次 ​ g.next() ​ 都会打破暂停状态去执行，直到遇到下一个 ​ yield ​ 或者 ​return​
- 遇到 ​ yield ​ 时，会执行 ​yeild​ 后面的表达式，并返回执行之后的值，然后再次进入暂停状态，此时 ​ done: false​。
- next​ 函数可以接受参数，**作为上个阶段异步任务的返回结果**，被函数体内的变量接收
- 遇到 ​ return ​ 时，会返回值，执行结束，即 ​done: true​
- 每次 ​ g.next() ​ 的返回值永远都是 ​{value: ... , done: ...} ​ 的形式


2. 