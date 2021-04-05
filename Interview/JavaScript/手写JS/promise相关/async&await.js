const { func } = require("prop-types")
const { async } = require("rxjs")

var a = 0
var b = async () => {
    a = a + await 10
    console.log('2', a) // -> '2' 10
    a = (await 10) + a
    console.log('3', a) // -> '3' 20
}
b()
a++
console.log('1', a) // -> '1' 1

// async 和 await 相比直接使用 Promise 来说，优势在于处理 then 的调用链，
// 能够更清晰准确的写出代码。缺点在于滥用 await 可能会导致性能问题，
// 因为 await 会阻塞代码，也许之后的异步代码并不依赖于前者，
// 但仍然需要等待前者完成，导致代码失去了并发性

// 作者：lessonSam
// 链接：https://www.jianshu.com/p/117c4ff834d4
// 来源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// async函数表示里面可能有异步方法,
// async 函数返回一个 Promise 对象, 因此我们也可以使用then来处理后续逻辑。
async function func1() {
    return 1;
}
func1().then(res => console.log(res));

// await后面跟一个表达式，async方法执行时，遇到await后会立即执行表达式，然后把表达式后边的代码放到微任务队列中，让出执行栈让同步代码先执行；
// 由于因为async await 本身就是promise + generator的语法糖。所以await后面的代码是microtask。所以

// 作者：vivianXIa
// 链接：https://www.jianshu.com/p/b5966d6f0b39
// 来源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async1() {
    console.log('async1 start');
    Promise.resolve(async2()).then(() => {
        console.log('async1 end');
    })
}


// 今日头条面试题
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
//答案：
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// settimeout