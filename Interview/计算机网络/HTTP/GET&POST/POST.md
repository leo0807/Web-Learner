有哪些请求方法？
http/1.1规定了以下请求方法(注意，都是大写):

- GET: 通常用来获取资源
- HEAD: 获取资源的元信息
- POST: 提交数据，即上传数据
- PUT: 修改数据
- DELETE: 删除资源(几乎用不到)
- CONNECT: 建立连接隧道，用于**代理服务器**
- OPTIONS: 允许客户端查看服务器的性能，列出可对资源实行的请求方法，用来跨域请求
- TRACE: 追踪请求-响应的传输路径，回显服务器收到的请求，主要用于测试或诊断

# OPTIONS Method
OPTIONS 请求即预检请求，可用于检测服务器允许的 http 方法。当发起跨域请求时，由于安全原因，触发一定条件时浏览器会在正式请求之前自动先发起 OPTIONS 请求，即 CORS 预检请求，服务器若接受该跨域请求，浏览器才继续发起正式请求

规范要求，对那些可能对服务器数据产生**副作用**的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。

## OPTIONS 触发条件
CORS 预检请求触发条件 本次请求是否触发该条件
1. 使用了下面任一 HTTP 方法：
   PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH
2. 人为设置了以下集合之外首部字段：
   Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width 
3. Content-Type 的值不属于下列之一:
   application/x-www-form-urlencoded、multipart/form-data、text/plain
## 请求头和响应头
### 预检请求头 request header 的关键字段：
Request Header 作用
Access-Control-Request-Method 告诉服务器实际请求所使用的 HTTP 方法
Access-Control-Request-Headers 告诉服务器实际请求所携带的自定义首部字段，本次实际请求首部字段中 content-type 为自定义
服务器基于从预检请求头部获得的信息来判断，是否接受接下来的实际请求。

### 预检响应头 response header 的关键字段：
response header 作用
Access-Control-Allow-Methods 返回了服务端允许的请求，包含 GET/HEAD/PUT/PATCH/POST/DELETE
Access-Control-Allow-Credentials 允许跨域携带 cookie（跨域请求要携带 cookie 必须设置为 true）
Access-Control-Allow-Origin 允许跨域请求的域名，这个可以在服务端配置一些信任的域名白名单
Access-Control-Request-Headers 客户端请求所携带的自定义首部字段 content-type


## OPTIONS 优化
Access-Control-Max-Age 这个响应首部表示 preflight request （预检请求）的返回结果（即 Access-Control-Allow-Methods 和 Access-Control-Allow-Headers 提供的信息） 可以被缓存的最长时间，单位是秒。(MDN)

# GET的URL长度
在 HTTP 协议里，并没有对 GET 请求的参数的长度做出任何的限制，事实上，HTTP 协议对 URL 的长度没有做任何的限制，而是服务器和浏览器对 URL 长度做了限制

1. GET 的最大长度显示是因为 浏览器和 web 服务器限制了 URI 的长度
不同的浏览器和 WEB 服务器，限制的最大长度不一样
2. 要支持 IE，则最大长度为 2083byte，若只支持 Chrome，则最大长度 8182byte
3. 所谓的请求长度限制是由浏览器和 web 服务器决定和设置的，各种浏览器和 web 服务器的设定均不一样，这依赖于各个浏览器厂家的规定或者可以根据 web 服务器的处理能力来设定

作者：izhongxia
链接：https://www.jianshu.com/p/512389822f8b
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



# GET 和 POST 有什么区别？
首先最直观的是语义上的区别。
而后又有这样一些具体的差别:
get一般用于 **查询**操作，post一般用于**用户提交**操作
post可以用于CSRF
从**缓存**的角度，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
从**编码**的角度，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。
从**参数**的角度，GET 一般放在 URL 中，因此不安全，POST 放在请求体中，更适合传输敏感信息。
从**幂等性**的角度，GET是幂等的，而POST不是。(**幂等表示执行相同的操作，结果也是相同的**)
从**TCP**的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(**火狐浏览器除外，它的 POST 请求只发一个 TCP 包**)



作者：神三元
链接：https://juejin.cn/post/6844904100035821575
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。