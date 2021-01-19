let secret = 3;
/**
 * 加密的迷药和解密的密钥是同一个
 * @param {*} message 
 */
function encrypt(message) {
    let buffer = Buffer.from(message);
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = buffer[i] + secret;
    }
    return buffer.toString();
}
function decrypt(message) {
    let buffer = Buffer.from(message);
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = buffer[i] - secret;
    }
    return buffer.toString();
}

let message = 'abc';
let encryptMessage = encrypt(message)
console.log(encryptMessage);
console.log(decrypt(encryptMessage));