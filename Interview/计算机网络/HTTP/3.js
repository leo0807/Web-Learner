/**
 * 非对称加密
 * RSA
 * ECC
 *
 * 公钥(e, N) m^e % N = c   => m加密数据 e随机数 N一个质数
 * 私钥(d, N) c^d % N = m
 *
 * 实现RSA非对称加密算法
 * 加密用的密钥 和解密用的密钥不一样 但是有关系
 * 无法通过公钥算出密钥
 * 两个质数相乘得到一个结果
 * 单向函数 p * q = K 给出K很难得到精确的p和q
 */

let p = 3,
    q = 11,
    N = q * p, //33
    fN = (p - 1) * (q - 1), //欧拉函数
    e = 7; //随意挑选一个指数e （e, N）成为公钥可以发给任何人
// 公钥和密钥是一对，加密的数据要用密钥解密，密钥的数据要用公钥来解密

// 可以从公钥取推算死要，但是要提前知道fN
//e * d %fN == 1说明就是我们要找的密钥
for (var d = 1; e * d % fN !== 1; d++) {
    d++;
}
console.log(d);//3
let data = 5;
let c = Math.pow(data, e) % N;
console.log('c', c);
let original = Math.pow(c, d) % N;
console.log(original);
// 公钥（7， 33） 密钥（3，33）
// 公钥加密私钥解
// 私钥加密公钥解
