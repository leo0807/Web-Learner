// fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。 fetch的优点：

// 符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
// 更好更方便的写法 坦白说，上面的理由对我来说完全没有什么说服力，因为不管是Jquery还是Axios都已经帮我们把xhr封装的足够好，使用起来也足够方便，为什么我们还要花费大力气去学习fetch？我认为fetch的优势主要优势就是：
// 语法简洁，更加语义化
// 基于标准 Promise 实现，支持 async/await
// 同构方便，使用 isomorphic-fetch
// 更加底层，提供的API丰富（request, response）
// 脱离了XHR，是ES规范里新的实现方式 最近在使用fetch的时候，也遇到了不少的问题：fetch是一个低层次的API，你可以把它考虑成原生的XHR，所以使用起来并不是那么舒服，需要进行封装。例如：
// fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
// fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
// fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
// fetch没有办法原生监测请求的进度，而XHR可以

const fetch = require("node-fetch");
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(reponse) {
    return reponse.json();
}

// Only absolute URLs are supported
const URL = "";
fetch(URL).then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        console.error(error);
    })

    // fetch 是全局量 window 的一个方法，它的主要特点有：
    // 1、第一个参数是URL:
    // 2、第二个是可选参数，可以控制不同配置的 init 对象
    // 3、使用了 JavaScript Promises 来处理结果/回调:

// fetch规范与jQuery.ajax()主要有两种方式的不同，牢记：

// 1、从 fetch()返回的 Promise 将不会拒绝HTTP错误状态, 即使响应是一个 HTTP 404 或 500。相反，
// 它会正常解决(其中ok状态设置为false), 并且仅在网络故障时或任何阻止请求完成时，它才会拒绝。

// 2、默认情况下, fetch在服务端不会发送或接收任何 cookies, 如果站点依赖于维护一个用户会话，
// 则导致未经认证的请求(要发送 cookies，必须发送凭据头).
// 这一点也可以做一些处理：
// 如果想要在同域中自动发送cookie,加上 credentials 的 same-origin 选项

fetch(url, {
    credentials: 'same-origin'
})
// same-origin值使得fetch处理Cookie与XMLHttpRequest类似。 否则，Cookie将不会被发送，导致这些请求不保留认证会话。

// 对于CORS请求，使用include值允许将凭据发送到其他域：

fetch(url, {
  credentials: 'include'
})