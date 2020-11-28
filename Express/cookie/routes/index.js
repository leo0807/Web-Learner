const express = require('express');
const app = express();
const crypto = require('crypto');
const router = express.Router();
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
app.get('/', (req, res) => res.send('Hello World!'))

module.exports = router;
// app.listen(port, () => console.log(`Example app listening on port port!`))