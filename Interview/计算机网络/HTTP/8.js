// Diffie-Hellman算法
// 是一种密钥交换协议，它可以让双方不泄漏密钥的情况下协商出一个密钥出来
// 对称加密 需要协商密钥
// TLS中使用了该算法
let N = 23;
let p = 5,
    secret1 = 6;
let A = Math.pow(p, secret1) % N;
console.log('p=', p, 'N=', N, 'A=', A);
let secret2 = 15;
let B = Math.pow(p, secret2) % N;
console.log('p=', p, 'N=', N, 'B=', B);

// A B的共同密钥
console.log(Math.pow(B, secret1) % N);
// B
console.log(Math.pow(A, secret2) % N);

let { createDiffieHellman } = require('crypto');

// 客户端
let client = createDiffieHellman(512);
let clientKeys = client.generateKeys();//p
let prime = client.getPrime();
let generator = client.getGenerator();

// 服务器
let server = createDiffieHellman(prime, generator);
let serverKeys = server.generateKeys();

let client_secret = client.computeSecret(serverKeys);
let server_secret = client.computeSecret(serverKeys);
console.log(client_secret.toString('hex') === server_secret.toString('hex'));