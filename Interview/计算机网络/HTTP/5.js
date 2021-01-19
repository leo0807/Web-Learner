/**
 *
 * 哈希函数的作用是给任意长度的数据生成出一个固定长度的数据
 * 可以通过X计算出哈希值Y，但不能从哈希Y得到X
 *
 * 哈希碰撞
 * 16个二进制数可以产生65535个哈希
 *
 *
 * 哈希有两中 1: 校验哈希 2.加密哈希
 */

// 1 不同输入有不同输出
// 2 不能从hash凡推出输入
// 3 长度固定

function hash(num) {
    return (num % 1024 + '').padStart(4, '0');
}

console.log(hash(1), hash(333), hash(1025));

//MD5
const crypto = require('crypto');
let content = '123456';
let md5Hash = crypto.createHash('md5').update(content).update(content).digest('hex');
console.log('md5 hash', md5Hash, md5Hash.length); //32

let salt = '123456'; //更加随机化
let sha1Hash = crypto.createHmac('sha256', salt).update(content).update(content).digest('hex');
console.log('SHA256', sha1Hash, sha1Hash.length); //64