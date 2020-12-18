// XMLHttpRequest
// get
const xhr = new XMLHttpRequest();
const URL = "/API";
xhr.open("GET", URL, false);
// false 代表异步的请求
xhr.onreadystatechange = function(){
    // 异步执行
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            console.log(xhr.responseText);
        }
    }
}
xhr.send(null);