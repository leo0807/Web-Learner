const express = require("express");
const router = express.Router();
const sqlSquery = require("../../module/lcMysql");

router.get('/', function (req, res, next) {
    res.send("Users management");
})
// 个人信息路由
router.get('/selfinfo', async (req, res) => {
    // 获取用户名
    const username = req.session.username;
    // 通过用户名查找所有的信息
    const sqlStr = "select * from user where username = ?";
    const result = await sqlSquery(sqlStr, [username]);
    const users = result[0];
    const roles = await getRoles();
    // 通过角色表获取所有角色
    const options = { users, roles };
    res.render('admin/users/selfinfo', options);
})

// 获取所有角色
async function getRoles() {
    const sqlStr = "select * from role";
    const result = await sqlSquery(sqlStr);
    return Array.from(result);          
}

module.exports = router;