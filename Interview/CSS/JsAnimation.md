- javascript直接实现；
- SVG（可伸缩矢量图形）；
- CSS3 transition；
- CSS3 animation；
- Canvas动画；
- requestAnimationFrame；

JS 实现 setTimeout，setIntervals
```
    <div id="rect"></div>
    <script>
        let elem = document.getElementById('rect');
        let left = 0;
        let timer = setInterval(function(){
            if(left<window.innerWidth-200){
                elem.style.marginLeft = left+'px';
                left ++;
            }else {
                clearInterval(timer);
            }
        },16);
    </script>
```
## 缺点
**javascript 实现动画通常会导致页面频繁性重排重绘，消耗性能，一般应该在桌面端浏览器。在移动端上使用会有明显的卡顿**
## 为什么是16ms
上面例子中，我们设置的setInterval时间间隔是16ms。一般认为人眼能辨识的流畅动画为**每秒60帧**，这里16ms比(1000ms/60)帧略小一些，但是一般可仍为该动画是流畅的。 
在很多移动端动画性能优化时，一般使用16ms来进行节流处理连续触发的浏览器事件。例如对touchmove、scroll事件进行节流等。通过这种方式减少持续事件的触发频率，可以大大提升动画的流畅性。

# JS动画
## 缺点：
- JavaScript在浏览器的主线程中运行，而主线程中还有其它需要运行的JavaScript脚本、样式计算、布局、绘制任务等,对其干扰导致线程可能出现阻塞，从而造成丢帧的情况。
- JS动画代码的**复杂度高于**CSS动画

## 优点：

- JavaScript动画控制能力很强, 可以在动画播放过程中对动画进行控制：开始、暂停、回放、终止、取消都是可以做到的。
- JS动画的效果比css3动画丰富,有些动画效果，比如曲线运动,冲击闪烁,视差滚动效果，只有JavaScript动画才能完成
- CSS3有兼容性问题，而JS大多时候没有兼容性问题

CSS动画

## 缺点：

- 运行过程**控制较弱**,无法附加事件绑定回调函数。CSS动画只能暂停,不能在动画中寻找一个特定的时间点，不能在半路反转动画，不能变换时间尺度，不能在特定的位置添加回调函数或是绑定回放事件,无进度报告
- 代码冗长。想用 CSS 实现稍微复杂一点动画,最后CSS代码都会变得非常笨重。

## 优点：
浏览器可以对动画进行优化。

浏览器使用与 requestAnimationFrame 类似的机制，requestAnimationFrame比起setTimeout，setInterval设置动画的优势主要是:
- requestAnimationFrame **会把每一帧中的所有DOM操作集中起来**，在一次重绘或回流中就完成,并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率,一般来说,这个频率为每秒60帧，这个人间隔人类不易察觉
- 每一次重新渲染的最佳时间大约是 16.6 ms，如果定时器的时间间隔过短，就会造成 ```过度渲染```(跳帧)，增加开销；过长又会延迟渲染，使动画不流畅。

- 在隐藏或不可见的元素中requestAnimationFrame不会进行重绘或回流，这当然就意味着**更少的的cpu，gpu和内存使用量**。

强制使用硬件加速 （通过 GPU 来提高动画性能）

## CSS动画比JS流畅的前提：

- JS在执行一些昂贵的任务
- 同时CSS动画不触发layout或paint
- 在CSS动画或JS动画触发了paint或layout时，需要main thread进行Layer树的重计算，这时CSS动画或JS动画都会阻塞后续操作。

只有如下属性的修改才符合“仅触发Composite，不触发layout或paint”：

- backface-visibility
- opacity
- perspective
- perspective-origin
- transfrom

所以只有用上了3D加速或修改opacity时，css3动画的优势才会体现出来。

代码相对简单,性能调优方向固定

对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写额外代码


来源：https://juejin.cn/post/6844903848981577735

## requestIdleCallback 和 requestAnimationFrame 详解
### 浏览器每一帧都需要完成的工作
1. 处理用户的交互
2. JS 解析执行
3. 帧开始。窗口尺寸变更，页面滚去等的处理
4. requestAnimationFrame(rAF)
5. 布局
6. 绘制

## requestAnimationFrame

- requestAnimationFrame 方法不同与 setTimeout 或 setInterval，它是由系统来决定回调函数的执行时机的，会请求浏览器在下一次重新渲染之前执行回调函数。
- 可以通过```cancelAnimationFrame```取消动画，或者通过设置flag取消递归


### requestIdleCallback

上面六个步骤完成后没超过 16 ms，说明时间有富余，此时就会执行 ```requestIdleCallback``` 里注册的任务。
```var handle = window.requestIdleCallback(callback[, options])```
- ```callback```：回调，即空闲时需要执行的任务，该回调函数接收一个 IdleDeadline 对象作为入参。其中 IdleDeadline 对象包含：
    - didTimeout，布尔值，表示任务是否超时，结合 timeRemaining 使用。
    - timeRemaining()，表示当前帧剩余的时间，也可理解为留给任务的时间还有多少。

- options：目前 options 只有一个参数
    - timeout。表示超过这个时间后，如果任务还没执行，则强制执行，不必等待空闲。

```
requestIdleCallback(myNonEssentialWork, { timeout: 2000 });
​
// 任务队列
const tasks = [
 () => {
   console.log("第一个任务");
 },
 () => {
   console.log("第二个任务");
 },
 () => {
   console.log("第三个任务");
 },
];
​
function myNonEssentialWork (deadline) {
 // 如果帧内有富余的时间，或者超时
 while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
   work();
 }
​
 if (tasks.length > 0)
   requestIdleCallback(myNonEssentialWork);
 }
​
function work () {
 tasks.shift()();
 console.log('执行任务');
}
```


- cancelIdleCallback
与 ```setTimeout``` 类似，返回一个唯一 id，可通过 ```cancelIdleCallback``` 来取消任务。

- 一些低优先级的任务可使用 requestIdleCallback 等浏览器不忙的时候来执行，同时因为时间有限，它所执行的任务应该尽量是能够量化，细分的微任务（micro task）。

因为它发生在一帧的最后，此时页面布局已经完成，所以不建议在 requestIdleCallback 里再操作 DOM，这样会导致页面再次重绘。DOM 操作建议在 rAF 中进行。同时，操作 DOM 所需要的耗时是不确定的，因为会导致重新计算布局和视图的绘制，所以这类操作不具备可预测性。

```Promise``` 也不建议在这里面进行，因为 Promise 的回调属性 Event loop 中优先级较高的一种微任务，会在 ```requestIdleCallback``` 结束时立即执行，不管此时是否还有富余的时间，这样有很大可能会让一帧超过 16 ms。
- 使用 ```requestIdleCallback``` 更新 DOM 存在的问题
1. 可能因为浏览器过于忙碌导致没有空余时间执行```requestIdleCallback```
2. 即使有时间执行```requestIdleCallback```，但是因为DOM执行时间不可预测，而导致执行时间超过浏览器提供的deadline，从使得画面卡顿
- 解决方案
    - 在```requestAnimationFrame```回调中进行对 DOM 更新， 因为此```API```和```setImmediate```类似，是按帧执行的
作者：DC_er
链接：https://juejin.cn/post/6844903848981577735
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
