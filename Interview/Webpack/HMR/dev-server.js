const path = require('path');
const express = require('express');
const mime = require('mime');
const webpack = require('webpack');
const MemoryFileSystem = require('memory-fs');
const config = require('./webpack.config');
// compiler代表整个webpack编译任务，全局只有一个
// 创建webpack实例
const compiler = webpack(config);
// 创建Server服务器
class Server {
    constructor(compiler) {
        this.compiler = compiler;
        let sockets = [];
        let lastHash; // 每次编译完成后都会产生一个stats对象，其中有一个hash值代表这一次编译结果hash就是一个32的字符串
        compiler.hooks.done.tap('webpack-dev-server', (stats) => {
            lastHash = stats.hash; // 每当新一个编译完成后都会向客户端发送消息
            sockets.forEach(socket => {
                // 先向客户端发送最新的hash值
                // 每次编译都会产生一个hash值， 另外如果是热更新的话，还会产生
                socket.emit('hash', stats.hash); // 先向客户端发送最新的hash值
                socket.emit('ok') //再向客户端发送一个ok
            })
        });
        const app = new express();
        // 以监控的模块启动一次webpack编译，当编译成功之后执行回调
        compiler.watch({}, err => {
            console.log('又一次编译任务成功完成了');
        });
        // 设置文件系统为内存文件系统
        const fs = new MemoryFileSystem();
        // 如果你把compiler的输出文件系统改成了 MemoryFileSystem的话，则以后再产出文件都打包内存里去了
        compiler.outputFileSystem = fs;
        function middleware(req, res, next) {
            if (req.url === './favicon.ico') {
                return res.sendStatus(404);
            }
            const filename = path.join(config.output.path, req.url.slice(1));
            const stat = fs.statSync(filename);
            if (stat.isFile()) { // 判断是否存在这个文件,如果在的话直接把这个读出来发给浏览器
                const content = fs.readFileSync(filename);
                const contentType = mime.getType(filename);
                res.setHeader('Content-Type', contentType);
                res.statusCode = res.statusCode || 200;
                res.send(content);
            } else {
                // next()
                return res.sendStatus(404);
            }
        }
        app.use(middleware);
        // 使用sockjs在浏览器端和服务端之间建立一个 websocket 长连接
        this.server = require('http').createServer(app);
        const io = require('socket.io')(this.server);
        // 启动一个 websocket服务器，然后等待连接来到，连接到来之后存进sockets池
        // 当有文件改动，webpack重新编译时，向客户端推送hash和ok两个事件
        io.on('connection', (socket) => {
            socket.push(socket);
            socket.emit('hash');
            // 再向客户端发送一个ok
            socket.emit('ok');
        })
    }
    listen(port) {
        this.server.listen(port, () => {
            console.log(`服务器已经在${port}端口上启动了`);
        })
    }
}
const server = new Server(compiler);
server.listen(8000);