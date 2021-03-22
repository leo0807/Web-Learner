# Dom 文档加载的步骤：
1. 解析 html 结构；
2. 加载外部脚本和样式表文件；
3. 解析并执行脚本；
4. dom 树构建完成（DOMContentLoaded）； **DOM ready /DOMContentLoaded**
5. 加载图片等外部文件；**图片 onload**
6. 页面加载完毕。**页面 onload**

# domready 和 onload 事件区别：
- 前者：在 DOM 文档结构准备完毕后就可以对 DOM 进行操作；
- 后者：当页面完全加载后（整个 document 文档包括图片、javascript 文件、CSS 文件等外部资源)，就会触发 window 上面的 load 事件。

作者：梁海杰\_IRV
链接：https://www.jianshu.com/p/6b0a95cdbc7a
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
