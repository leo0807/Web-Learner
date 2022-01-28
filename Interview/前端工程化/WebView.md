# WebView
### 什么是WebView
1. 从客户端的角度来说，
  - ```WebView``` 用来展示网页的 ```view``` 组件，该组件是你运行自己的浏览器或者在你的线程中展示线上内容的基础。使用 ```Webkit``` 渲染引擎来展示，并且支持前进后退等基于浏览历史，放大缩小，等更多功能。

  - 简单来说 ```WebView``` 是手机中内置了一款高性能 Webkit 内核浏览器，在 SDK 中封装的一个组件。不过没有提供地址栏和导航栏，只是单纯的展示一个网页界面。

2. 从前端开发者，WebView 可以简单理解为页面里的 iframe 。原生 app 与 WebView 的交互可以简单看作是页面与页面内 iframe 页面进行的交互。就如页面与页面内的 iframe 共用一个 Window 一样，原生与 WebView 也共用了一套原生的方法。


## JSBridge
- JSBridge 简单来讲，主要是 给 JavaScript 提供调用 Native 功能的接口，让混合开发中的『前端部分』可以方便地使用地址位置、摄像头甚至支付等 Native 功能。

- 既然是『简单来讲』，那么 JSBridge 的用途肯定不只『调用 Native 功能』这么简单宽泛。实际上，JSBridge 就像其名称中的『Bridge』的意义一样，是 Native 和非 Native 之间的桥梁，它的核心是 构建 Native 和非 Native 间消息通信的通道，而且是 双向通信的通道。
