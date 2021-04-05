# Promise的缺点
如果拒绝一个 Promise 并给出一个理由（也就是 一个出错消息），这个值就会被传给拒绝回调。
如果成功的观察回调出现异常或者错误。有可能会被 Promise 吞掉，
如.then中throw error而后续的语句没有.catch

async/await 是基于 Promise 实现的，

Async/Await 较 Promise 优势：

减少了代码量，提高了代码可读性；
————————————————
版权声明：本文为 CSDN 博主「newway007」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/newway007/article/details/103022749
