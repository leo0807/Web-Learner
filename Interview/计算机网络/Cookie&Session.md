# Cookie localStorage sessionStorage
- sessionStorage, localStorage, cookie这三者都可以被用来在**浏览器端**存储数据，而且都是**字符串类型的键值对**。 区别在于前两者属于WebStorage，创建它们的目的便于客户端存储数据。 而Cookie早在网景公司的浏览器中就开始支持，最初目的是为了保持HTTP的状态。

- cookie是网站为了**标识用户身份**而存储在用户本地终端上的数据（通常经过加密）。cookie**始终**在同源的http请求中携带（即使不需要）都会在浏览器和服务器端间来回传递。session storage和local storage不会自动把数据发给服务器，**仅在本地保存**；

存储大小：cookie数据大小不会超过4K，session storage和local storage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或者更多；
有期时间：local storage存储持久数据，浏览器关闭后数据不丢失，除非自动删除数据。session storage数据在当前浏览器窗口关闭后**自动删除**。cookie 设置的cookie过期时间之前一直有效，即使窗口或者浏览器关闭；


## cookie

具体： https://juejin.cn/post/6844903841909964813#heading-3
在不设置HttpOnly的情况下， document.cookie可获取cookie


Cookie 是小甜饼的意思。顾名思义，cookie 确实非常小，它的大小限制为4KB左右，是网景公司的前雇员 Lou Montulli 在1993年3月的发明。它的主要用途有保存登录信息，比如你登录某个网站市场可以看到“记住密码”，这通常就是通过在 Cookie 中存入一段辨别用户身份的数据来实现的。

## localStorage
localStorage 是 HTML5 标准中新加入的技术，它并不是什么划时代的新东西。早在 IE 6 时代，就有一个叫 userData 的东西用于本地存储，而当时考虑到浏览器兼容性，更通用的方案是使用 Flash。而如今，localStorage 被大多数浏览器所支持，如果你的网站需要支持 IE6+，那以 userData 作为你的 polyfill 的方案是种不错的选择。

## sessionStorage
sessionStorage 与 localStorage 的接口类似，但保存数据的生命周期与 localStorage 不同。做过后端开发的同学应该知道 Session 这个词的意思，直译过来是“会话”。而 sessionStorage 是一个前端的概念，它只是可以将一部分数据在当前会话中保存下来，刷新页面数据依旧存在。但当页面关闭后，sessionStorage 中的数据就会被清空。

## 三者异同
cookie 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效,存放数据大小一般4K左右，而sessionStorage与localStorage大小在5兆左右，在客户端生成，localStorage除非被清除，否则会永久保存，sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除，cookie在与服务器端通信每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题,而sessionStorage与localStorage仅在客户端（即浏览器）中保存，不参与和服务器的通信。

1. cookie由服务端生成，用于标识用户身份；而两个storage用于浏览器端缓存数据
2. 三者都是键值对的集合
3. 一般情况下浏览器端不会修改cookie，但会频繁操作两个storage
4. 如果保存了cookie的话，http请求中一定会带上；而两个storage可以由脚本选择性的提交
5. 会话的storage会在会话结束后销毁；而local的那个会永久保存直到覆盖。cookie会在过期时间之后销毁。
6. 安全性方面，cookie中最好不要放置任何明文的东西。两个storage的数据提交后在服务端一定要校验（其实任何payload和qs里的参数都要校验）。

作者：heachou
链接：https://www.jianshu.com/p/846c033c0cc8
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

