const http = require('http');
// 创建服务器对象
const server = http.createServer();
// 监听对当前服务器对象的请求
server.on('request', function(req, res){
    // 当服务器被请求时，会触发请求事件，并传入请求对象和响应对象

    res.setHeader("Content-type", "text/html");
    // 根据路径信息，显示不同的页面内容
    if(req.url === '/'){
        res.end('<h2>Hello World</h2>');
    }else if(req.url === '/domestics-page'){
        res.end('<h2>Domestic Page</h2>');
    }else{
        res.end("<h1>404 PAGE NOT FOUND</h1>");
    }
    
});
// 服务器监听的端口号   
server.listen(3000, function(){
    console.log("Server Lanuched Successfullly");
})

