const express = require('express');
const router = express.Router();
const app = express();

// GET user listing

router.get('/', function (req, res, next) {
    res.send("respond with a resource");
});

// 设置Session
// 相比Cookie session高度加密且封装
router.get('/setSession', (req, res) => {
    // 登陆之后，要能够快速获得用户的姓名，vip等级，是否登陆
    req.session.isLogin = 'true';
    req.session.username = 'scott';
    req.session.vipLevel = 5;

    res.send('登陆状态已设置到Session中');
})
// 销毁路由
router.get('/exitSession', (req, res) => {
    req.session.destroy(() => {
        console.log("销毁seesion完毕");
    })
    res.send("成功退出登陆");
})

module.exports = router;