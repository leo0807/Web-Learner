# Dom 文档加载的步骤：
1. 解析 html 结构；
2. 加载外部脚本和样式表文件；
3. 解析并执行脚本；
4. dom 树构建完成（DOMContentLoaded）； **DOM ready /DOMContentLoaded**
5. 加载图片等外部文件；**图片 onload**
6. 页面加载完毕。**页面 onload**

- beforeunload/unload(基本不会用到)，**当浏览器窗口关闭或者刷新时**，会触发 beforeunload 事件。当前页面不会直接关闭，可以点击确定按钮关闭或刷新，也可以取消关闭或刷新。我们可以检查用户是否保存了修改，并提示他是否确定离开当前页面
```
window.onbeforeunload = function() {
    return "There are unsaved changes. Leave now?";
}
```

# DOMContentLoaded/ domready 和 onload 事件区别：
- 前者：在 DOM 文档结构准备完毕后就可以对 DOM 进行操作；
在这里我们可以明确 DOMContentLoaded 所计算的时间，当文档中没有脚本时，浏览器解析完文档便能触发 DOMContentLoaded 事件；如果文档中包含脚本，则**脚本会阻塞文档的解析**，而脚本需要等位于脚本前面的 css 加载完才能执行。在任何情况下，DOMContentLoaded 的触发不需要等待图片等其他资源加载完成


DOMContentLoaded 不同的浏览器对其支持不同，所以在实现的时候我们需要做不同浏览器的兼容。

1. 支持 DOMContentLoaded 事件的，就使用 DOMContentLoaded 事件；
2. IE6、IE7 不支持 DOMContentLoaded，但它支持 onreadystatechange 事件，该事件的目的是提供与文档或元素的加载状态有关的信息。
3.  更低的 ie 还有个特有的方法 doScroll， 通过间隔调用：document.documentElement.doScroll("left");

可以检测 DOM 是否加载完成。 当页面未加载完成时，该方法会报错，直到 doScroll 不再报错时，就代表 DOM 加载完成了。该方法更接近 DOMContentLoaded 的实现

- 后者：当页面完全加载后（整个 document 文档包括图片、javascript 文件、CSS 文件等外部资源)，就会触发 window 上面的 load 事件。
```
window.onload = function(){
    //onload 事件所有的浏览器都支持，所以我们不需要什么兼容，只要通过调用
}
```


作者：梁海杰\_IRV
链接：https://www.jianshu.com/p/6b0a95cdbc7a
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# script标签放置问题

## 首屏渲染

页面的优化中提到将 js 放到 body 标签底部，原因是因为浏览器生成 Dom 树的时候是一行一行读 HTML 代码的，script 标签放在最后面就不会影响前面的页面的渲染。那么问题来了，既然 Dom 树完全生成好后页面才能渲染出来，浏览器又必须读完全部 HTML 才能生成完整的 Dom 树，script 标签不放在 body 底部是不是也一样，因为 dom 树的生成需要整个文档解析完毕。

现代浏览器为了更好的用户体验,渲染引擎将尝试**尽快**在屏幕上显示的内容。它不会等到所有 HTML 解析之前开始构建和布局渲染树。部分的内容将被解析并显示。也就是说浏览器能够渲染不完整的 dom 树和 cssom，尽快的减少白屏的时间。假如我们将 js 放在 header，js 将阻塞解析 dom，dom 的内容会影响到 First Paint，导致 First Paint 延后。所以说我们会将 js 放在后面，以减少 First Paint 的时间，但是不会减少 DOMContentLoaded 被触发的时间。
