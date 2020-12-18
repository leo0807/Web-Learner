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


