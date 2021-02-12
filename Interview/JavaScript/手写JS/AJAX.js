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
xhr.onreadystatechange = function(){
    // 异步执行
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            // 成功执行
            console.log(xhr.responseText);
        } else {
            console.log("failed");
        }
    }
}
xhr.send(null);
// Fetch