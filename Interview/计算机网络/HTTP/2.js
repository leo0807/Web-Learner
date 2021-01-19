// 官方加密模块
// 对称加密
let crypto = require('crypto');
// key => 密钥， iv用于指定加密时所用的算法
function encrypt(data, key, iv) {
    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    // 加密数据
    cipher.update(data);
    // 结果输出为16进制的字符串
    return cipher.final('hex');
}
// 加密算法用128，则对应的密钥为16位
// 加密算法用256，则对应的密钥为32位
function decrypt(data, key, iv) {
    let cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    cipher.update(data, 'hex'); //添加hex也就是十六进制的字符串数据
    return cipher.final('utf8');
}

let key = '1234567890123456';
let iv = '1234567890123456';
let data = 'hello';
let encryptData = encrypt(data, key, iv);
let decryptData = decrypt(encryptData, key, iv);
console.log(decryptData);