/**
 * 数字证书是有一个可信的第三方发出的，
 * 用来证明所有人身份以及所有人拥有某个公钥的电子文件
 *
 * CA的公钥已经内置到浏览器或操作系统中
 * 数字认证机构CA
 *
 * 1. 服务器把公钥注册到CA；
 * 2. CA用自己的私钥将服务器的公钥进行数字签名证书并签发数字证书
 * 3. 服务器把证书发给客户端
 * 4. 客户端拿到服务器的数字证书后，使用CA公钥确认，使用CA确认服务器数字证书的真实性
 * 5. 把数据用服务器公钥加密后发送
 */

//  实现数字证书的原理

let { generateKeyPairSync, createHash, createSign, createVerify } = require('crypto');
// 生成一堆密钥对，一个是公钥，一个是私钥 
let serverRSA = generateKeyPairSync('rsa', {
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
let caRSA = generateKeyPairSync('rsa', {
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
const info = {
    domain: 'http://127.0.0.1:8000',
    publicKey: serverRSA.publicKey //服务器公钥
}
// 把这个申请信息发给CA请求办法证书
// 实现的签名时候不不是info，而是它的hash，因为Info的数据量很大导致性能很差
let hash = createHash('sha256').update(JSON.stringify(info)).digest('hex');
let passphrase = 'passphrase';
let sign = getSign(hash, caRSA.privateKey, passphrase);
let cert = {
    info,
    sign//CA的签名
}//这就是证书，客户端会先验证证书，用CA的公钥验证证书的合法性，然后取出公钥
let valid = verifySign(hash, sign, caRSA.publicKey);
console.log('浏览器验证CA的签名', valid);
let serverPublickey = cert.info.publicKey;
// 拿到了serverPublickey之后，如果想向服务器发数据，

function getSign(content, privatekey, passphrase) {
    var signObj = createSign('RSA-SHA256');
    signObj.update(content);
    return signObj.sign({
        key: privatekey,
        format: 'pem',
        passphrase
    }, 'hex')
}

// CA的公钥
function verifySign(content, sign, publicKey) {
    var verifyObj = createVerify('RSA-SHA256');
    verifyObj.update(content);
    return verifyObj.verify(publicKey, sign, 'hex');
}

