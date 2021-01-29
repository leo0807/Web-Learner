// const os = require('os');
// Check CPU Info
// console.log(os.cpus());
// check RAM
// console.log(os.totalmem());
// console.log(os.freemem());

var http = require('http');
var port = 3000;
// 创建io对象
var io = require('socket.io')(server);
io.on("connection", function () {
    console.log('Client end point has connected');
})
var server = http.createServer(function (req, res) {
    res.end("Hello");
})

server.listen(port, "127.0.0.1");