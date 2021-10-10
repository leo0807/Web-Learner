# 来源：https://segmentfault.com/a/1190000013662126

# 主体流程
1. 从浏览器接收 url 到开启网络请求线程（这一部分可以展开浏览器的机制以及进程与线程之间的关系）
2. 开启网络线程到发出一个完整的 http 请求（这一部分涉及到 dns 查询，tcp/ip 请求，五层因特网协议栈等知识）
3. 从服务器接收到请求到对应后台接收到请求（这一部分可能涉及到负载均衡，安全拦截以及后台内部的处理等等）
4. 后台和前台的 http 交互（这一部分包括 http 头部、响应码、报文结构、cookie 等知识，可以提下静态资源的 cookie 优化，以及编码解码，如 gzip 压缩等）
5. 单独拎出来的缓存问题，http 的缓存（这部分包括 http 缓存头部，etag，catch-control 等）
6. 浏览器接收到 http 数据包后的解析流程（解析 html-词法分析然后解析成 dom 树、解析 css 生成 css 规则树、合并成 render 树，然后 layout、painting 渲染、复合图层的合成、GPU 绘制、外链资源的处理、loaded 和 domcontentloaded 等）
7. CSS 的可视化格式模型（元素的渲染规则，如包含块，控制框，BFC，IFC 等概念）
8. JS 引擎解析过程（JS 的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）
9. 其它（可以拓展不同的知识模块，如跨域，web 安全，hybrid 模式等等内容）

# 解析页面流程
1. 解析 HTML，构建 DOM 树
2. 解析 CSS，生成 CSS 规则树
3. 合并 DOM 树和 CSS 规则，生成 render 树
4. 布局 render 树（Layout/reflow），负责各元素尺寸、位置的计算
5. 绘制 render 树（paint），绘制页面像素信息
6. 浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（composite），显示在屏幕上
