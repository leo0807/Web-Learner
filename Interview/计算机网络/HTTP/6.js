/**
 * 数字签名
 * 基本原理：用私钥去签名，用公钥去验证签名
 * A+文件+自己的私钥生成签名， B用签名和公钥来验证文件是否被篡改
 */

let { generateKeyPairSync, createSign, createVerify } = require('crypto');
// 生成一堆密钥对，一个是公钥，一个是私钥 
let rsa = generateKeyPairSync('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'passphrase' //私钥的密码
    }
})
let file = 'file';
let signObj = createSign('RSA-SHA256'); //创建签名对象
signObj.update(file); //放入文件内容
// 私钥 格式 密码 输出
// 用RSA私钥进行签名， 输出16进制字符串
let sign = signObj.sign({ key: rsa.privateKey, format: 'pem', passphrase: 'passphrase' }, 'hex');

// 创建签名验证对象
let verifyObj = createVerify('RSA-SHA256');
// 放入文件内容
verifyObj.update(file);
// 验证签名是否合法
let isValid = verifyObj.verify(rsa.publicKey, sign, 'hex');
console.log(isValid);

/**
 * 实现原理：
 * 1. 验证方，先拿到文件file
 * 2. 用公钥计算签名， 如果跟对方签名sign匹配， 则验证通过
 */