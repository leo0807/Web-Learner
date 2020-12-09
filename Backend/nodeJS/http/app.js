const http = require("http");
const fs = require('fs');
http.createServer((req, res)=>{
    console.log(req.url); //获取URL
    // req => 获取客户端传过来的信息
    // res =》给浏览器响应Info
    res.writeHead(200, {"Content-type": "text/html; charset='utf-8"});
    res.write("This is node Js");
    res.end();//结束响应
}).listen(3002);

const fs = require('fs');
var path = './upload';

fs.stat(path, (err, data)=>{
    if(err){
        mkdir(path);
        return;
    }
    if(data.isDirectory()){
        console.log('Upload Directory Exists');
    }else{
        fs.unlink(path, ()=>{
            if(!err){
                mkdir(path);
            }else{
                console.log('Data is incorrect');
            }
        })
    }
});

function mkdir(dir){
    fs.mkdir(dir, (err) =>{
           if(err){
               console.log(err);
               return;
           }
    });
}