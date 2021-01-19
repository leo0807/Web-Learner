let { generateKeyPairSync, privateEncrypt, publicDecrypt } = require('crypto');
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
        passphrase: 'passphrase'
    }
})
let message = 'hello';
let encryptMessage = privateEncrypt({
    key: rsa.privateKey, passphrase: 'passphrase'
}, Buffer.from(message, 'utf8'));
console.log('encryptMessage', encryptMessage);
let decryptMessage = publicDecrypt(rsa.publicKey, encryptMessage);
console.log('decryptMessage', decryptMessage.toString());

// A给B发数据，用B的公钥加密， B用自己私钥解密