JS是单线程的，它的多线程是通过异步的Event Loop进行实现的
EventLoop由三个部分组成，分别是调用栈***CallStack**，消息队列**Message Queue**和微任务队列组成**Microtask Queue**组成的
函数被压入栈中执行
回掉函数则会进入消息队列中成为消息，消息会在栈清空后运行
异步操作如Promise和async则会被掉入微任务队列中，会在调用栈清空的时候立即执行，并且新加入的微任务也会一同被立即执行