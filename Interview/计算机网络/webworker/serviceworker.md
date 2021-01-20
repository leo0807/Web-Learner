# 什么是service worker
一个服务器与浏览器之间的中间人角色(代理服务器)，如果网站中注册了 service worker 那么它可以拦截当前网站所有的请求，进行判断（需要编写相应的判断程序），如果需要向服务器发起请求的就转给服务器，如果可以直接使用缓存的就直接返回缓存不再转给服务器。从而大大提高浏览体验。

他们旨在创建有效的离线体验，拦截网络请求，以及根据网络是否可用采取合适的行动，更新驻留在服务器上的资源。他们还将允许访问推送通知和后台同步 API。用来构建 PWA 应用

# 作用
基于 web worker（一个独立于 JavaScript 主线程的独立线程，在里面执行需要消耗大量资源的操作不会堵塞主线程）
在 web worker 的基础上增加了离线缓存的能力
本质上充当 Web 应用程序（服务器）与浏览器之间的代理服务器（可以拦截全站的请求，并作出相应的动作->由开发者指定的动作）
创建有效的离线体验（将一些不常更新的内容缓存在浏览器，提高访问体验）
由事件驱动的,具有生命周期
可以访问 cache 和 indexDB
支持推送
并且可以让开发者自己控制管理缓存的内容以及版本


# 使用流程
## 注册
```
/_ 判断当前浏览器是否支持 serviceWorker _/
if ('serviceWorker' in navigator) {
/_ 当页面加载完成就创建一个 serviceWorker _/
window.addEventListener('load', function () {
/_ 创建并指定对应的执行内容 _/
/_ scope 参数是可选的，可以用来指定你想让 service worker 控制的内容的子目录。 在这个例子里，我们指定了 '/'，表示 根网域下的所有内容。这也是默认值。 _/
navigator.serviceWorker.register('./serviceWorker.js', {scope: './'})
.then(function (registration) {

                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(function (err) {

                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }

```
## 安装
在我们指定的处理程序 serviceWorker.js 中书写对应的安装及拦截逻辑
```
/_ 监听安装事件，install 事件一般是被用来设置你的浏览器的离线缓存逻辑 _/
this.addEventListener('install', function (event) {
/_ 通过这个方法可以防止缓存未完成，就关闭 serviceWorker _/
event.waitUntil(
/_ 创建一个名叫 V1 的缓存版本 _/
caches.open('v1').then(function (cache) {
/_ 指定要缓存的内容，地址为相对于跟域名的访问路径 _/
return cache.addAll([
'./index.html'
]);
})
);
});

/_ 注册 fetch 事件，拦截全站的请求 _/
this.addEventListener('fetch', function(event) {
event.respondWith(
// magic goes here
  
 /_ 在缓存中匹配对应请求资源直接返回 _/
caches.match(event.request)
);
});
```
# 注意事项
1. Service worker 运行在 worker 上下文 --> 不能访问 DOM
2. 它设计为完全异步，同步 API（如 XHR 和 localStorage）不能在 service worker 中使用
3. 出于安全考量，Service workers 只能由 HTTPS 承载
4. 在 Firefox 浏览器的用户隐私模式，Service Worker 不可用
5. 其生命周期与页面无关（关联页面未关闭时，它也可以退出，没有关联页面时，它也可以启动）
