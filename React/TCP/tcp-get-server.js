const { url } = require('inspector');
const net = require('net');
/**
 * 创建一个TCP服务器，每当一个客户链接了，就会为他创建一个socket
 */
const server = net.createServer(socket => {
    socket.on('data', data => {
        let request = data.toString();
        let [requestLine, ...headerRows] = request.split('\r\n');
        let [method, path] = requestLine.split(' ');
        let headers = headerRows.slice(0, -2).reduce((memo, row) => { // 去掉\r \n
            let [key, value] = row.split(': ');
            memo[key] = value;
            return memo;
        }, {});
        console.log('method', method);
        console.log('url', url);
        console.log('headers', headers);
        // 构建响应
        let rows = [];
        rows.push('HTTP/1.1 200 OK');
        rows.push('Connection-type: text/plain');
        rows.push(`Date: ${new Date().toGMTString()}`);
        rows.push('Connection: keep-alive');
        rows.push('Transfer-Encoding: chunked');
        let body = 'get';
        rows.push(`Content-Length:${Buffer.byteLength(body)}`); //返回字节长度， 一般是body。length
        rows.push(`\r\n${Buffer.byteLength(body).toString(16)}\r\n${body}\r\n0`);
        let reseponse = rows.join(`\r\n`);
        console.log('reseponse', reseponse);
        socket.end(reseponse);

    })
})