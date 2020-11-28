const express = require('express');
const app = express();
const crypto = require('crypto');
const router = express.Router();
const sessionRouter = require("./routes/sessionModule.js");
// Express视图设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Express 中间件
// session配置
app.use(session({
    secret: "asgsdfasa",
    cookie:{}
}))
// GET home page
router.get('/', function (req, res, next){
    res.render('index', { title: 'Express' });
})
router.get('/setcookie', function (req, res) {
    // 基础设置cookie，有效期默认为1个会话，浏览器关闭即失效
    // res.cookie("isLogin","true");
    // res.cookie("isLogin","true",{maxAge:100000, httpOnly: true});
    res.cookie('login', 'true', { signed: true });
    res.send('cookie successfully set up');
})
router.get('/secret', (req, res) => {
    const password = "123456";
    const sf = crypto.createHash('md5');
    sf.update(password);
    let content = sf.digest('hex');
    console.log(content);
})

function encrypto(str) {
    let password = str;
    password += 'MyEncrypto';//修改加密算法
    // 对字符串加密
    const sf = crypto.createHash('md5');
    sf.update(password);
    const content = sf.digest('hex');
    return content

}

let secretCookie = {

}
function setSecretCookie(str, secretStr) {
    secretCookie[secretStr] = str;
}
function getSecretCookie(secretStr) {
    return secretCookie[secretStr];
}
// Self-defined encrypto cookied method
router.get('/appSecret', (req, res) => {
    const secretStr = encrypto('true');
    res.cookie('register', secretStr);
    setSecretCookie("true", secretStr);
    res.send('Cookie Encryptoed successfully');
})
// Get the value of self-defined cookie value
router.get("/getAppSecrete", (req, res) => {
    // 获取自己设置的秘文
    const secretStr = req.cookies.register;
    const content = secretCookie[secretStr];
    console.log("解密后的秘文: " + content);
})

app.get('/', (req, res) => res.send('Hello World!'))

module.exports = router;
// app.listen(port, () => console.log(`Example app listening on port port!`))