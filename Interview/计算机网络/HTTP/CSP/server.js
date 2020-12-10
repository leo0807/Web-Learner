const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url);
    if (request.url === '/') {
        const html = fs.readFileSync('index.html', 'utf-8');
        response.writeHead(200, {
            'Content-type': 'text/html',
            // 只能加载 http 或 https 的src
            // 'Content-Security-Policy': 'default-src http: https:'
            // 限制所有src只能加载内部提供的资源， 后边的域名表示允许加载的项 
            // 'Content-Security-Policy': 'default-src \'self\' http://cdn.bootcss/com'
            // 限制表单
            'Content-Security-Policy': 'form-action \'self\''
            // 其它单项src 如script-src img-src
            // report-uri /report(指定路径) 服务器遇到异常主动发送scp-report
            // 'Content-Security-Policy-Report-Only' 不阻止异常 但依旧发送report

            // 也可以通过HTML meta标签实现此功能
            // <meta http-equiv="Content-Security-Policy" 
            // content="form-action self; script-src self" >
            // 但是不支持 Content-Security-Policy-Report-Only

            // 限制AJAX请求 => connect-sec
            
        })
        response.end(html)
    } else {
        response.writeHead(200, {
            'Content-type': 'application/javascript',
        })
        response.end("outside js loaded")
    }
   
}).listen(8888)

console.log('Server Running');