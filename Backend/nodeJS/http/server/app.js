const path = require('path');
const http = require('http');
const url = require('url');
class App{
    constructor(){
        this.server = http.createServer();
        this.reqEvent = {};
        this.server.on('request', (req, res) => {
            // 解析路径
            let pathObj = url.parse(req.url)
            console.log(pathObj);
            pathObj = path.parse(pathObj.pathname);
            console.log(pathObj.name);
            if(pathObj.dir in this.reqEvent){
                this.reqEvent[pathObj.dir](req, res);
            }else{
                res.setHeader("Content-type", "text/html; charset=utf-8");
                res.end("<h1> 404 Page Not Found!</h1>");
            }
        });
    }
    on(urllink, fn){
        this.reqEvent[urllink] = fn;
    }
    run(port, callback){
        this.server.listen(port, callback);
    }
}

function render(options, template){
    
}

module.exports = App;