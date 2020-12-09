const express = require("express");
const router = express.Router();
const sqlQuery = require("../../module/lcMysql");

// Encrypto method
var crypto = require('crypto');
function jiami(str){
    let salt = "fjdsoigijasoigjasdiodgjasdiogjoasid"
    let obj = crypto.createHash('md5')
    str = salt+str;
    obj.update(str)
    return obj.digest('hex')
}

router.get('/login', function (req, res, next) {
     res.render("login/login.ejs");
    // res.render("../../views/login/login.ejs");
})
router.get('/register', function (req, res, next) {
    res.render("login/register.ejs");
})
router.post('/register', async(req, res) => {
    // 获取用户名和密码
    let username = req.body.username;
    let password = req.body.password;
    // 判断用户是否存在
    let sqlStr = "select * from user where username = ?"
    let result = await sqlQuery(sqlStr, [username]);
    // res.render('info/info')
    if (result.length) {
        // 告知用户用户名已经存在 
        res.render('info/info', {
            title: "注册失败",
            content: "用户已存在",
            href: "/rl/register",
            hrefTxt: "注册页面"
        })
    } else {
        // 告知注册成功
        sqlStr = "insert into user (username, password, roleid) values (?,?,1)";
        await sqlQuery(sqlStr, [username, jiami(password)]);
        res.render('info/info', {
            title: "注册成功",
            content: "注册成功， 即将进入登陆页",
            href: "/rl/login",
            hrefTxt: "登陆页"
        })
    }
})

//处理登陆的POST请求
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sqlStr = "select * from user where username = ? and password = ?";
    const result = await sqlQuery(sqlStr, [username, jiami(password)]);
    if (result.length === 0) {
        res.render('info/info', {
            title: "登陆失败",
            content: "用户名或密码错误",
            href: "/rl/login",
            hrefTxt: "登陆页面"
        })
    } else {
        req.session.username = username;
        res.render('info/info', {
            title: "登陆成功",
            content: "登陆成功， 即将进入后台",
            href: "/admin",
            hrefTxt: "后台页"
        })
    }
})
// 退出登陆，删除session
router.get('/loginout', (req, res) => {
    req.session.destroy();
    res.render('info/info', {
        title: "退出成功",
        content: "立即跳转到登陆页面",
        href: "/rl/login",
        hrefTxt: "登陆页"
    })
})

module.exports = router;