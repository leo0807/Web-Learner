const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const newsRouter = require("./newsRouter");
const doctorsRouter = require("./doctorsRouter");
const patientsRouter = require("./patientsRouter");

// 判断是否符合条件进入后台中间件
function permission(req, res, next) {
    if (req.session.username === undefined) {
        // 尚未登陆，返回至登陆页面
        res.render('info/info', {
            title: "尚未登陆",
            content: "请重新登陆， 即将进入登陆页",
            href: "/rl/login",
            hrefTxt:"登陆页"
        })
    } else {
        // 正常进入
        next();
    }
}

router.get('/', permission, function (req, res, next) {
    // console.log(req.session);
    res.render("admin/index", {
        username: req.session.username
    });
})
// 后台用户管理
router.use('/users', userRouter);
// 后台新闻管理
router.use('/news', newsRouter);
// 后台医生管理
router.use('/doctors', doctorsRouter);
// 后台患者管理
router.use('/patients', patientsRouter);
module.exports = router;