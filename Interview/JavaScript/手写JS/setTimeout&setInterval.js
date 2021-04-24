// setInterval 所会遇到的问题
// JS运行机制，普通程序在执行栈中先执行，执行栈为空时候，把任务队列中的回掉函数放入执行栈中执行

// 假设setInterval的间隔为1秒，但是setInterval中的回掉函数需要执行很长时间，比如一个很大的for循环，需要3秒
// 那么setInterval则因执行栈中还有程序运行而无法以1秒为间隔运行，导致代码不按照时间间隔执行，时间间隔错乱

// 用setTimeout来模拟setInterval

function myInterval(func, millisecond) {
    function inside() {
        func();
        setTimeout(inside, millisecond);
    }
    // inside();
    // 如果这里用inside递归的话
    // 虽然结果正确，但是函数inside和函数func全部都在执行栈运行了
    // 而不是在任务队列中，这与setInterval不同
    setTimeout(inside, millisecond);
}
function example() {
    console.log("myInterval");
}
myInterval(example, 1000);
// setTimeout倒计时为什么会出现误差？
// 首先，js是单线程，同一时间只能做一件事情。如果前面一个任务执行时间很长（比如网络请求），后面就必须的等待很长时间。为了解决这个问题，js分为同步任务和异步任务。js会先执行同步任务，执行完后，才会去执行异步任务，异步任务一般放在异步队列中。也就是执行完同步任务后，会不断从异步队列中取出要执行的任务放在主栈中执行，这个过程就称为"event-loop"。
// 异步队列分为宏任务队列和微任务队列，
// 宏任务队列包括：
// setTimeout, setInterval, setImmediate
// 微任务队列包括：
// promise, async / await
// 微任务队列执行顺序大于宏任务队列。
// 所以，setTimeout出现误差是因为：
// 要先执行同步任务，才会执行异步任务；
// 异步任务中，微任务执行顺序大于宏任务执行顺序。

