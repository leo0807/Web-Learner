const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let server = http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url);
    if (['/get.html'].includes(pathname)) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        let content = fs.readFileSync(path.join(__dirname, 'static', 'get.html'));
        res.write(content);
        res.end();
    } else if (pathname === '/get') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('get');
        res.end();
    } else {
        res.statusCode = 400;
        res.end();
    }
})

server.listen(8080);