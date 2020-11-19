const str = "Hello World";
let buf = Buffer.from(str);
console.log(buf);

console.log(buf.toString());

let buf = Buffer.alloc(10);
buf[0] = 1;
console.log(buf[0]);