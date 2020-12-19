// XMLHttpRequest
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