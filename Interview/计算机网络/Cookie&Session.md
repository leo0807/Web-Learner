# Cookie localStorage sessionStorage
- sessionStorage, localStorage, cookie这三者都可以被用来在**浏览器端**存储数据，而且都是**字符串类型的键值对**。 区别在于前两者属于WebStorage，创建它们的目的便于客户端存储数据。 而Cookie早在网景公司的浏览器中就开始支持，最初目的是为了保持HTTP的状态。

- cookie是网站为了**标识用户身份**而存储在用户本地终端上的数据（通常经过加密）。cookie**始终**在同源的http请求中携带（即使不需要）都会在浏览器和服务器端间来回传递。session storage和local storage不会自动把数据发给服务器，**仅在本地保存**；

存储大小：cookie数据大小不会超过4K，session storage和local storage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或者更多；
有期时间：local storage存储持久数据，浏览器关闭后数据不丢失，除非自动删除数据。session storage数据在当前浏览器窗口关闭后**自动删除**。cookie 设置的cookie过期时间之前一直有效，即使窗口或者浏览器关闭；


## cookie

具体： https://juejin.cn/post/6844903841909964813#heading-3
一般来说，只有服务器操作 Cookie 才能保证一些必要的安全。但有时候，可能需要前端来增删改查 Cookie
在不设置**HttpOnly**的情况下， 客户端可以通过**document.cookie**可获取cookie

Cookie 是小甜饼的意思。顾名思义，cookie 确实非常小，它的大小限制为4KB左右，是网景公司的前雇员 Lou Montulli 在1993年3月的发明。它的主要用途有保存登录信息，比如你登录某个网站市场可以看到“记住密码”，这通常就是通过在 Cookie 中存入一段辨别用户身份的数据来实现的。

每个域名下的Cookie不得超过**50个（IE）**，大小不超过4KB。不同浏览器有不同的约束。
### 使用场景
- 对话管理：保存登陆，购物车等需要记录的信息
- 个性化： 保存用户的偏好，比如网页的字体大小，背景颜色等等
- 追踪： 记录和分析用户行为
### 相关属性
1. Expires 和 Max-Age
- Expires 属性指定一个具体的到期时间，到了这个指定的时间之后，浏览器就不再保留这个 cookie ,它的值是 UTC 格式，可以使用 Date.prototype.toUTCString() 格式进行转换

- Max-Age 属性制定了从现在开始 cookie 存在的秒数，比如 60 _ 60 _ 24 \* 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie

2. Domain 和 path
这两个属性决定了，HTTP 请求的时候，哪些请求会带上哪些 Cookie

现在一个 cookie 它的 Domain 属性为 www.example.com，path 属性值为 /。意味着，这个 cookie 对该域的根路径以及它的所有子路径都有效。如果我们修改了它的 path 值，为 /forums，那么这个 cookie 只要在访问 www.example.com/forums 及其子路径时才会带上

3. Secure 和 HttpOnly
- Secure 属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的 Secure 属性。
 
- HttpOnly 属性指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是 Document.cookie 属性、XMLHttpRequest 对象和 Request API 都拿不到该属性。这样就防止了该 Cookie 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie。

### Cookie安全性问题
为什么 cookie 不安全
最大的原因是因为它存储在浏览器端（用户本地），一些别有用心的人能够通过浏览器截获 cookie（脚本、利用工具抓取等）

1. cookie 截获
cookie 以纯文本的形式在浏览器和服务器之间传递，在 web 通信时极容易被非法用户截获和利用。非法用户截获 cookie 后，在 cookie 的有效时间内重新发放给服务器，那么这个非法用户就拥有了这个合法用户的所有权限。
2. Flash 的内部代码隐患
Flash 中有一个 getURL()函数，Flash 利用它自动打开指定的页面。那么这个就意味着，你在观看 Flash 动画时，在 Flash 的内部可以悄无声息的打开一个极小的不易发现的包含特殊操作的页面，可以是木马，可以向远端输入当前 cookie 或者用户信息，这是非常危险的，由于这个是 Flash 内部的操作，所以网站无法禁止，要想避免，尽量打开本地防火墙以及访问正规网站。

作者：肆桶
链接：https://www.jianshu.com/p/3104e83dea8d
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





## localStorage
localStorage 是 HTML5 标准中新加入的技术，它并不是什么划时代的新东西。早在 IE 6 时代，就有一个叫**userData**的东西用于本地存储，而当时考虑到浏览器兼容性，更通用的方案是使用 Flash。而如今，localStorage 被大多数浏览器所支持，如果你的网站需要支持 IE6+，那以 userData 作为你的 polyfill 的方案是种不错的选择。

### localstorage跨域问题
每个**域名**都有自己的localstorage,普通的方式是无法获取的，但是可以通过**postMessage**实现跨域获取


### localstorage容量问题
localStorage 最大容量**5M**的意思是**每一个域名下**的localStorage容量是 5M，假如现在 a.com 域名下 localstorage 存不下了，我们可以使用**iframe**创建 b.com 域框架（子页面）用于存储 a.com 剩下的数据。然后使用 postMessage 读写数据。

**window.postMessage()**方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有**相同的协议**（通常为 https），**端口号**（443 为 https 的默认值），以及**主机**(两个页面的模数**Document.domain**设置为相同的值) 时，这两个脚本才能相互通信。

```
otherWindow.postMessage(message, targetOrigin, \[transfer\]);
```
- otherWindow
其他窗口的一个**引用**，比如 iframe 的 contentWindow 属性、执行 window.open 返回的窗口对象、或者是命名过或数值索引的 window.frames。

- message
将要发送到其他 window 的数据。它将会被**结构化克隆算法序列化**。这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化

- targetOrigin
通过窗口的 origin 属性来指定哪些窗口能接收到消息事件，其值可以是字符串"_"（表示无限制）或者一个 URI。在发送消息的时候，**如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配 targetOrigin 提供的值**，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口；例如，当用 postMessage 传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的 origin 属性完全一致，来防止密码被恶意的第三方截获。如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的 targetOrigin，而不是_。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。

- _**transfer**_ 可选
是一串和 message 同时传递的 Transferable 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

### 使用场景
localStorage 可以用于存储该浏览器对该页面的访问次数，当然，如果换个浏览器，这个次数就重新开始计数了。还可以用来存储一些固定不变的页面信息，这样就不需要每次都重新加载了，这个值也可以进行覆盖。

访问这个页面的时候，script 脚本会自动运行，localStorage.pagecount 就会 ++ 了，从而达到统计页面访问次数的目的。


## sessionStorage
sessionStorage 与 localStorage 的接口类似，但保存数据的生命周期与 localStorage 不同。做过后端开发的同学应该知道 Session 这个词的意思，直译过来是“会话”。而 sessionStorage 是一个前端的概念，它只是可以将一部分数据在当前会话中保存下来，刷新页面数据依旧存在。但当页面关闭后，sessionStorage 中的数据就会被清空。

### sessionStorage 应用场景
使用 sessionStorage 进行页面传值

//有时会有这样的需求，我们从 A 页面获取的数据，需要在 B 页面发送给后端，这时就需要我们将数据从 A 页面传递到 B 页面。

//A 页面
//首先检测 Storage
```
if (typeof(Storage) !== "undefined") {
    sessionStorage.'name'=value;
} else {
    sessionStorage.name = '';
}

//B 页面
if (typeof(Storage) !== "undefined") {
    var B_name = sessionStorage.name;
}
```


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

