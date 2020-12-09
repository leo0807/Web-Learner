const url = require('url');

const httpURL = "https://sale.vmall.com/hwmate.html?cid=10602";
const urlObj = url.parse(httpURL);
console.log(urlObj);

const targetURL = "http://www.baidu.com";
httpURL = "./sxt/laochen.html";
const newURL = url.resolve(targetURL, httpURL);