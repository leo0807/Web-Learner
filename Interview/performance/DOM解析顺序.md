来源：https://juejin.cn/post/6844903745730396174#heading-0

# dom 解析过程
整个 dom 的解析过程是**顺序**，并且**渐进式**的。

顺序指的是从第一行开始，一行一行依次解析；渐进式则指得是浏览器会迫不及待的将解析完成的部分显示出来

## 阻塞型
会阻塞 dom 解析的资源主要包括：

- 内联 css
- 内联 javascript
- 外联普通 javascript
- 外联 defer javascript
- javascript 标签之前的外联 css

document 对象派发 DOMContentLoaded 事件来标识 dom 树构建完成，而 defer javascript 是在该事件派发之前请求并执行的，因此也归类于阻塞型

需要注意的是 javascript 标签之前的外联 css。其实按说 css 资源是不应该阻塞 dom 树的构建过程的，毕竟 css 只影响 dom 样式，不影响 dom 结构。

但是实际情况是 dom 树的构建受 javascript 的阻塞，而 javascript 执行时又可能会使用类似 Window.getComputedStyle()之类的 API 来获取 dom 样式
```
const para = document.querySelector('p');
const compStyles = window.getComputedStyle(para);
```
因此浏览器一般会在遇到```<script>```标签时将该标签之前的外联 css 请求并执行完成。但是注意这里加了一个前提条件就是 javascript 标签之前的外联 css，就是表示被 javascript 执行依赖的外联 css。这个容易忽略的点这篇文章也有说明，推荐阅读。

[https://molily.de/domcontentloaded/]

这些阻塞型的资源请求并执行完之后 dom 树的解析便完成了，这时 document 对象就会派发 DOMContentLoaded 事件，表示 dom 树构建完成



# 非阻塞型
不阻塞 dom 解析的资源主要包括：

- javascript 标签之后的外联 css
- image
- iframe
- 外联 async javascript

dom 树解析完成之后会派发 DOMContentLoaded 事件，对于外联 css 资源来说分为两类，一类是位于```<script>```标签之前，一类是位于```<script>```标签之后。位于```<script>```标签之后的外联 css 是不阻塞 dom 树的解析的
