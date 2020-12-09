const path = require('path');
const fs = require('fs');

let str = '';
let info = path.extname(str);
console.log(info);

const arr = ['/localFile', 'Frontend', 'finalTarget'];
const info1 = path.resolve(...arr);
console.log(info1);

//Currnt directory path
console.log(__dirname);
//Current File Name
console.log(__filename);
console.log(path.parse(__filename));
console.log(path.extname(__filename));
// Join path
const info3 = path.join(__dirname,info1);
console.log(info3);