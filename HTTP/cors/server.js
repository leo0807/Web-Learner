const http = require("http");
const fs = require('fs');
http.createServer((request, response) => {
    const html = fs.readFileSync('test.html', 'utf8');
    response.writeHead(200, {
        'Content-type': 'text/html'
    })
    response.end(html);
}).listen(8888);

console.log("Server listrning 8888");