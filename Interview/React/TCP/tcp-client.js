let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    console.log('onreadystatechange', xhr.readyState);
}
xhr.open('GET', 'http://127.0.0.1:8000/get');
xhr.responseType = 'text';
xhr.setRequestHeader('name', 'junx');
xhr.setRequestHeader('age', '111');
xhr.onload = function () {

}
xhr.send();

const http = require('http'); //应用层
const net = require('net'); //传输层
const ReadState = {
    UNSET: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
}
class MyXMLHttpRequest {
    constructor() {
        this.readyState = ReadState.UNSET; //默认未调用open方法
        this.headers = { 'Connection': 'keep-alive' }; //配置请求头
    }
    open(method, url) {
        this.method = method || 'GET';
        this.url = url;
        let { hostname, port, path } = require('url').parse(url);
        this.hostname = hostname;
        this.port = port;
        this.path = path;
        this.headers['Host'] = `${hostname}:${port}`;
        // 通过传输层的net模块发起请求
        // @ts-ignore
        const socket = this.socket = net.createConnection({ hostname, port },
            // 链接成功之后
            () => {
                socket.on('data', data => {
                    data = data.toString();
                    // 处理响应
                    let [response, bodyRows] = data.split('\r\n\r\n');
                    let [statusLine, ...headerRows] = response.split('\r\n');
                    let [, status, statusText] = statusLine.split(' ');
                    this.status = status;
                    this.statustext = statusText;
                    this.responseHeaders = headerRows.reduce((memo, row) => {
                        let [key, value] = row.split(': ');
                        memo[key] = value;
                        return memo;
                    }, {});
                    let [, body,] = bodyRows.split('\r\n');
                    this.response = this.responseText = body;
                    this.onload && this.onload();
                })
            })
    }

    setRequestHeader(key, value) {
        this.headers[key] = value;
    }
    getAllResponseHeaders() {
        let result = '';
        for (let key in this.responseHeaders) {
            result += `${key}: ${this.responseHeaders[key]}`;
        }
        return result;
    }
    getResponseHeaders(key) {
        return this.responseHeaders[key];
    }
    onload() { }
    send() {

        let rows = [];
        rows.push(`${this.method} ${this.url} HTTP/1.1`);
        rows.push(...Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`));
        let request = rows.join('\r\n') + '\r\n\r\n';
        this.socket.write(request);
    }
}