浏览器的主要线程包括：UI渲染线程，JS主线程，GUI事件触发线程，http请求线程
JS作为脚本语言，它的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。（这里这些问题我们不做研究）

JS为我们提供了一个Worker的类，它的作用就是为了解决这种阻塞的现象。当我们使用这个类的时候，它就会向浏览器申请一个新的线程。这个线程就用来单独执行一个js文件。

```
//postMessage(msg);
//postMessage方法把在新线程执行的结果发送到浏览器的js引擎线程里
  worker.onmessage = function(){
      //获取在新线程中执行的js文件发送的数据 用event.data接收数据
      console.log( event.data )
  };
  setTimeout( function(){
      worker.terminate();
      //terminate方法用于关闭worker线程
 },2000)
     
 setTimeout( function(){
     worker = new Worker("js/test22.js");
     //再次开启worker线程
 },3000)
```

在新线程中使用postMessage()方法可以向主线程中发送一些数据，主线程中使用worker的onmessage事件来接收这些数据，这样就实现了js的多线程执行和多线程之间数据的传递。

作者：马小超321
链接：https://www.jianshu.com/p/31b72682d183
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。