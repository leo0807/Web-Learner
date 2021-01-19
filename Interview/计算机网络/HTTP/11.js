var https = require('http');
https.createServer(function (req, res) {
    let buffer = Buffer.from('hello'); //字节的数组
    res.end(buffer);
}).listen(8000, () => console.log('Listening port 8000'));
// HTTP协议面临的三大风险
// 1. 窃听风险  解决办法：信息加密 AES
// 2. 密钥的共享问题 密钥传递  非对称加密 RSA和ECC
// 3. 信息篡改 完整性校验 散列算法MD5和SHA
// 4. 身份冒充 CA权威机构 散列算法MD5和SHA+RSA签名
//      但是非对称密钥速度较慢， 可以用协商密钥解决，A将对称密钥用B的公钥发给B
//      防止信息被篡改，可以使用CA，用A的私钥进行签名。B收到之后去CA验证digest
// 套件 Hash算法，密钥交换算法，签名算法，对称算法
// 先TCP三次握手，再TLS握手

/**
 * 协商密钥
 * 1. RSA
 * 2. ECCDH 客户端生成一个参数；服务器生成一个参数，然后交换，各自计算
 * 在此过程中没有用到公钥
 */