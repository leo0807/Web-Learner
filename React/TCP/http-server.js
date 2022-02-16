const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let server = http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url);
    if (['/get.html', '/post.html'].includes(pathname)) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        let content = fs.readFileSync(path.join(__dirname, 'static', pathname));
        res.write(content);
        res.end();
    } else if (pathname === '/get') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('get');
        res.end();
    } else if (pathname === '/post') {
        let buffers = [];
        // TCP传输的时候可能会分包，
        // 举例 如果文件10M那么可能氛围10次分发，每次1M
        req.on('data', data => {
            //请求体
            buffers.push(data);//buffer是一个类类似于字节数组
        });
        res.on('end', data => {
            console.log(req.method);
            console.log(req.url);
            console.log(req.headers);
            let body = Buffer.concat(buffers);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.write(body);
            res.end();
        })

    } else {
        res.statusCode = 400;
        res.end();
    }
})

server.listen(8080);