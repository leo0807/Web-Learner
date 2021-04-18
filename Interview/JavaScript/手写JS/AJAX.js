// XMLHttpRequest

// 其中最核心的依赖是浏览器提供的XMLHttpRequest对象，
// 它扮演的角色相当于秘书，使得浏览器可以发出HTTP请求与接收HTTP响应。
// 浏览器接着做其他事情，等收到XHR返回来的数据再渲染页面
// get
const xhr = new XMLHttpRequest();
const URL = "/API";
// 连接服务器
xhr.open("GET", URL, false);
// false 代表异步的请求
xhr.onreadystatechange = function () {
    // 异步执行
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            // 成功执行
            console.log(xhr.responseText);
        } else {
            console.log("failed");
        }
    }
}
xhr.send(null);
// Fetch

// readyState表示xhr对象的请求状态，取值范围是0——4，分别表示5个不同的状态。
// 0：（未初始化）xhr对象已经创建，但还没有调用open()方法。值为0表示对象已经存在，否则浏览器会报错：对象不存在。
// 1 : （载入 / 发送请求）调用open()方法对xhr对象进行初始化，根据参数(method, url, true) ，完成对象状态的设置。并调用send()方法开始向服务端发送请求。值为1表示正在向服务端发送请求。
// 2 ：（载入完成 / 响应接收）接收服务器端响应回的数据。但获得的还只是服务端响应的原始数据，并不能直接在客户端使用。值为2表示send()请求方法执行完成，并已经接收完全部的响应数据（未解析）。
// 3 － （交互 / 解析数据）正在解析从服务器端接收到的响应数据。即根据服务器端响应头部返回的MIME类型把数据转换成能通过responseBody、responseText或responseXML属性存取的格式，为在客户端调用作好准备。值为3表示正在解析数据。
// 4 － （后台处理完成）响应内容解析完成，可以在客户端调用了。此阶段确认全部数据都已经解析为客户端可用的格式，解析已经完成。值为4表示数据解析完毕，可以通过XMLHttpRequest对象的相应属性取得数据。

// 总之，整个XMLHttpRequest对象的生命周期应该包含如下阶段：
// 创建－0初始化请求－1发送请求－2接收数据－3解析数据－4完成 。