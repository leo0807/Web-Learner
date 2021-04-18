JS是单线程的，它的多线程是通过异步的Event Loop进行实现的
EventLoop由三个部分组成，分别是调用栈***CallStack**，消息队列**Message Queue**和微任务队列组成**Microtask Queue**组成的
1. 函数被压入栈中执行
2. 回掉函数则会进入消息队列中成为消息，消息会在栈清空后运行
3. 异步操作如Promise和async则会被掉入微任务队列中，会在调用栈清空的时候立即执行，并且新加入的微任务也会一同被立即执行

# 为什么氛围微任务和宏任务？
## 插队
在一个Event Loop中，微任务会在下一个事件循环之前执行调用完，并且其中将微任务中新注册的微任务一并调用执行完，然后开始下一次事件循环，所以如果有新的 Macrotask 就需要一直等待，等到上一个 Event loop 当中 Microtask 被清空为止。由此可见， 我们可以在下一次 Event loop 之前进行插队。

如果不区分 Microtask 和 Macrotask，那就无法在下一次 Event loop 之前进行插队，其中新注册的任务得等到下一个 Macrotask 完成之后才能进行，这中间可能你需要的状态就无法在下一个 Macrotask 中得到同步。状态的同步对于视图来说至关重要，这也就牵扯到了为什么 javascript 是单线程的原因所在。

作者：evan
链接：https://www.zhihu.com/question/316514618/answer/1311354630
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
