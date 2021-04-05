// Generator函数的概念
// Generator函数是协程在ES6的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

// 整个Generator函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。Generator函数的执行方法如下。

function* gen(x) {
    var y = yield x + 2;
    return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
// 上面代码中，调用Generator函数，会返回一个内部指针（即遍历器）g 。这是Generator函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，上例是执行到x + 2为止。

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }

// 上面代码中，第一个next方法的value属性，返回表达式x + 2的值（3）。
// 第二个next方法带有参数2，这个参数可以传入 Generator 函数，
// 作为上个阶段异步任务的返回结果，被函数体内的变量y接收。
// 因此，这一步的 value 属性，返回的就是2（变量y的值）。




// 作者：呼呼哥
// 链接：https://www.jianshu.com/p/c37c2721d99e
// 来源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

