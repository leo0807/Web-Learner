const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {

    // 302 临时跳转
    // 301 和 302 的区别
    // 在302的情况下，每次请求都要经过服务器指定新的location
    // 而301只需要在服务器端请求一次i新的location 之后再次发送请求时，客户端在浏览器內直接去新的路径
    // 新的地址被浏览器缓存在disk cache 中
    response.writeHead(302, {  // or 301
      'Location': '/new'
    })
    response.end()
  }
  if (request.url === '/new') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    })
    response.end('<div>this is content</div>')
  }
}).listen(8888)

console.log('server listening on 8888')