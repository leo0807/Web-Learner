const http = require('http');
const fsf = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.headers);
    if(req.method === 'GET'){
        let fileUrl;
        if(req.url === '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        let filePath = path.resolve('/public' + fileUrl);
        const fileExt = path.extname(filePath);

        if(fileExt === '.html'){
            fs.exists(filePath, (exits) =>{
                if(!exits){
                    res.statusCode = 404;
                    res.setHeader('Content-type','text/html');
                    res.end('<html><body>Error 404!!! Page'+ fileUrl +'Not Found!</body></html>');
                    return ;
                }else{
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'text/html');
                    fs.createServer(filePath).pipe(res);
                }
            });
        }
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end('<html><body>Hello World!</body></html>');
});

server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});