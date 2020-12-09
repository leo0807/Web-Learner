const fs = require('fs');
let str = '';

for (let i = 0; i < 500; i++) {
    str += 'data input \n';
}

const writeStream = fs.createWriteStream('./output.txt');
writeStream.write(str);
writeStream.on('finish', ()=>{
    console.log('Writing Completed');
});

const readStream = fs.createReadStream('./output2.txt');
readStream.pipe(writeStream);

const ws = fs.createWriteStream("hello.txt");
console.log(ws);

// Add Listener
ws.on('open', function(){
    console.log('File had opened');
});
ws.on('ready', function(){
    console.log('File is ready');
});
ws.on('closed', function(){
    console.log('File has closed');
});

ws.write("Hello word", (err)=> {
    if(err) console.log(err);
    else console.log("Content stream input completed");
});
ws.end(function(){ console.log("File Stream closed")});

const rs = fs.createReadStream('hello.txt');
console.log(rs);

rs.on('open', function(){
    console.log('读取流 开始');
});
rs.on('ready', function(){
    console.log('读取流 准备');
});
rs.on('closed', function(){
    console.log('读取流 结束');
});
rs.on('data', function(chunk){
    console.log(chunk,chunk.toString());
})