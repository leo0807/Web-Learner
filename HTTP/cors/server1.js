const http = require("http");

http.createServer((request, response) => {
    response.end("123");
}).listen(8887);

console.log("Server listrning 8888");