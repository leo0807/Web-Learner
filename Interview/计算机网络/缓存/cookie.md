# cookie、session 区别
1. cookie 存储于浏览器端，而 session 存储于服务端
2. cookie 的安全性相比于 session 较弱，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗
考虑到安全应当使用 session。
3. session 会在一定时间内保存在服务器上。当访问增多时，会占用服务器的资源，所以考虑到服务器性能方面，可以使用 cookie
cookie 存储容量有限制，单个 cookie 保存数据不能超过 **4k**，且很多浏览器限制一个站点最多保存 **20 个** cookie。而对于 session ，其默认大小一般是 **1024k**

# cookie、sessionStorage、localStorage 异同点
## html5 中 webStorage 包含 sessionStorage 和 localStorage
### 共同点：
    都保存在浏览器端，且是同源的
### 区别：

1. cookie 数据始终在**同源**的 http 请求中携带，而 **webStorage** 不会再请求中携带，仅仅在本地存储
2. 存储大小区别，cookie 是 4k，webStorage 可以达到 **5M** 甚至更大
3. 数据有效时间区别： sessionStorage 仅仅是会话级别的存储，它只在当前浏览器关闭前有效，不能持久保持；localStorage 始终有效，即使窗口或浏览器关闭也一直有效，除非用户手动删除，其才会失效；cookie 只在设置的 cookie 过期时间之前一直有效。
4. 作用域区别：sessionStorage 不在不同的浏览器窗口中共享，即使是同一个页面； localStorage 和 cookie 在所有同源窗口是共享的
Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。Web Storage 的 api 接口使用更方便。

## web storage 和 cookie 的区别
Web Storage 的概念和 cookie 相似，区别是它是为了更大容量存储设计的。Cookie 的大小是受限的，并且每次你请求一个新的页面的时候 Cookie 都会被发送过去，这样无形中浪费了带宽，另外 cookie 还需要指定作用域，**不可以跨域**调用。

除此之外，Web Storage 拥有 setItem,getItem,removeItem,clear 等方法，不像 cookie 需要前端开发者自己封装 setCookie，getCookie。

但是 Cookie 也是不可以或缺的：Cookie 的作用是与服务器进行交互，作为 HTTP 规范的一部分而存在 ，而 Web Storage 仅仅是为了在**本地“存储”数据而生**。

Cookies:服务器和客户端都可以访问；大小只有 4KB 左右；有有效期，过期后将会删除；

本地存储：只有本地浏览器端可访问数据，服务器不能访问本地存储直到故意通过 POST 或者 GET 的通道发送到服务器；每个域 5MB；没有过期数据，它将保留知道用户从浏览器清除或者使用 Javascript 代码移除

