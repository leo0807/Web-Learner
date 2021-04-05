# Promise的缺点
1、无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
2、如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
3、当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
4、Promise 真正执行回调的时候，定义 Promise 那部分实际上已经走完了，所以 Promise 的报错堆栈上下文不太友好


promise.then 里的回调函数放到相应宏任务的微任务队列中，等宏任务里边的同步代码执行完后再执行；


async/await 是基于 Promise 实现的，

Async/Await 较 Promise 优势：

减少了代码量，提高了代码可读性；
————————————————
版权声明：本文为 CSDN 博主「newway007」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/newway007/article/details/103022749
