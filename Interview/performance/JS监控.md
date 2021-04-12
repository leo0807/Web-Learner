# 为什么要做性能监控
谷歌将页面加载速度作为一个重要的SEO权重

# 可以做性能监控的点
- 白屏时间
- 首屏时间
- 用户可操作时间
- 总下载时间
---------------------------------------- 
- 白屏时间指**head内资源**加载完成
- 首屏时间指**可视区域内最后一张图片加载完成**的时间
- 可操作时间指**Document.onready**时间
- 总下载时间指**Document.onload**时间
# 白屏时间
白屏时间是**用户首次看到内容的时间**，也叫做**首次渲染时间**，chrome 高版本有**firstPaintTime**接口来获取这个耗时，但大部分浏览器并不支持，必须想其他办法来监测。仔细观察 WebPagetest 视图分析发现，白屏时间出现在**头部外链资源加载完附近**，因为浏览器只有加载并解析完头部资源才会真正渲染页面。基于此我们可以通过获取头部资源加载完的时刻来近似统计白屏时间

```
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="UTF-8"/>
    <script>
      var start_time = +new Date; //测试时间起点，实际统计起点为 
    </script>
    <script src="js"></script>  
    <script>
      var end_time = +new Date; //时间终点
      var headtime = end_time - start_time; //头部资源加载时间    
      console.log(headtime);
    </script>
</html>
```
# 首屏时间
首屏时间的统计比较复杂，因为涉及图片等多种元素及异步渲染等方式。观察加载视图可发现，影响首屏的主要因素的**图片的加载**。通过统计首屏内图片的加载时间便可以获取首屏渲染完成的时间。统计流程如下

首屏位置调用 API 开始统计 -> 
**绑定首屏内所有图片的 load 事件** -> 页面加载完后判断图片是否在首屏内，找出加载最慢的一张 ->
首屏时间

# 可操作时间
用户可操作默认可以统计**domready**  时间，因为通常会在这时候绑定事件操作。对于使用了模块化异步加载的 JS 可以在代码中去主动标记重要 JS 的加载时间，这也是产品指标的统计方式

# 总下载时间
总下载时间默认可以统计onload时间，这样可以统计同步加载的资源全部加载完的耗时。如果页面中存在很多异步渲染，可以将异步渲染全部完成的时间作为总下载时间

## document.ready和window.onload的区别
document.ready和window.onload的区别——JavaScript文档加载完成事件。
页面加载完成有两种事件：
一是ready，表示文档结构已经加载完成（不包含图片等非文字媒体文件）。
二是onload，指示页面包含图片等文件在内的所有元素都加载完成。

## 为什么要使用document.ready()或者document.onload()
$(document).ready() 里的代码是在页面内容都加载完才执行的，如果把代码直接写到script标签里，当页面加载完这个script标签就会执行里边的代码了，此时如果你标签里执行的代码调用了当前还没加载过来的代码或者dom，那么就会报错，当然如果你把script标签放到页面最后面那么就没问题了，此时和ready效果一样。

## 如何监控页面卡顿
来源：https://zhuanlan.zhihu.com/p/39292837
1. FPS Extension
```
var lastTime = performance.now();
var frame = 0;
var lastFameTime = performance.now();
var loop = function(time){
  var now = performance.now();
  var fs = now - lastFameTime;
  lastFame = now;
  var fps = Math.round(1000 / fps);
  frame++;
  if(now > 1000 + lastTime){
    var fps = Math.round((frame * 1000) / (now - lastTime));
    frame = 0;
    lastTime = now;
  }
  window.requestAnimationFrame(loop);
}
```
通过FPS确定网页是否存在卡顿
```
//连续出现3次低于20的fps，即判断为有卡顿
function isBlocking(fpsList, below = 20, last = 3){
  var count = 0;
  for(var i = 0; i < fpsList.length; i++){
    if(fpsList[i] && fpsList[i] < beliow){
      count++;
    }else{
      count = 0;
    }
    if(count >= last) return true;
  }
  return false;
}
```
## 造成网页崩溃的原因
来源：https://blog.csdn.net/wumingqian_137229/article/details/53905611

1. 在客户端，JavaScript 所造成的内存泄漏，也将可能使得浏览器崩溃
浏览器使用引用计数来为 Native 对象处理内存，而引用计数的对象无法被销毁，涉及 Native 对象的循环引用将会出现内存泄漏。
2. 网站的程序代码编写不规范
引起的内存泄漏问题不必多说，系统中存在无法回收的内存，有时候会造成内存不足或系统崩溃。
3. 网页数据过多

网页含有大量需要处理的数据，造成系统繁忙，如多图页面，超长页面等，或者网页内嵌的各种控件会导致浏览器处理大量数据，造成系统繁忙。如 Flash 游戏，ActiveX 控件等。当浏览器访问网站的时候，如果网站的数据量大，会使得浏览器一般在处理过程中会占用很大的 CPU 使用率和内存、造成浏览器失去响应，甚至会使电脑系统死机。在网站开发的时候，如果充分考虑 Web 性能，很大程度上能避免这个问题。

5. 其他原因

除以上提到的原因之外，还有其他许多原因，虽然有些不会导致浏览器直接崩溃，但也会造成网站无法访问，如日志文件导致磁盘已满、Web 服务器 C 指针错误、进程缺乏文件描述符、线程死锁、数据库中的临时表不够用和服务器超载等


## 如何监控网页崩溃？
来源： https://zhuanlan.zhihu.com/p/40273861
```
window.addEventListener('load', function () {
  sessionStorage.setItem('good_exit', 'pending');
  setInterval(function () {
    sessionStorage.setItem('time_before_crash', new Date().toString());
  }, 1000);
});

window.addEventListener('beforeunload', function () {
  sessionStorage.setItem('good_exit', 'true');
});

if(sessionStorage.getItem('good_exit') &&
sessionStorage.getItem('good_exit') !== 'true') {
/_
insert crash logging code here
_/
alert('Hey, welcome back from your crash, looks like you crashed on: ' + sessionStorage.getItem('time_before_crash'));
}

```

2. 基于 Service Worker 的崩溃统计方案
随着 PWA 概念的流行，大家对 Service Worker 也逐渐熟悉起来。基于以下原因，我们可以使用 Service Worker 来实现网页崩溃的监控：
1. Service Worker 有自己独立的工作线程，与网页区分开，网页崩溃了，Service Worker 一般情况下不会崩溃；
2. Service Worker 生命周期一般要比网页还要长，可以用来监控网页的状态；
3. 网页可以通过 navigator.serviceWorker.controller.postMessage API 向掌管自己的 SW 发送消息。


p1：网页加载后，通过 postMessage API 每 5s 给 sw 发送一个心跳，表示自己的在线，sw 将在线的网页登记下来，更新登记时间；
p2：网页在 beforeunload 时，通过 postMessage API 告知自己已经正常关闭，sw 将登记的网页清除；
p3：如果网页在运行的过程中 crash 了，sw 中的 running 状态将不会被清除，更新时间停留在奔溃前的最后一次心跳；
sw：Service Worker 每 10s 查看一遍登记中的网页，发现登记时间已经超出了一定时间（比如 15s）即可判定该网页 crash 了。
