const express = require("express");
const router = express.Router();
const fs = require('fs');
const sqlQuery = require("../../module/lcMysql");
const jiami = require('../../module/jiami');
// 上传模块
const multer = require('multer');
// 配置上传对象
const upload = multer({ dest: "./public/upload" });
// 引入userlistrouter
const userListRouter = require("./users/userListRouter");

router.get('/', function (req, res, next) {
    res.send("Users management");
})
// 个人信息路由
router.get('/selfinfo', async (req, res) => {
    // 获取用户名
    const username = req.session.username;
    // 通过用户名查找所有的信息
    const sqlStr = "select * from user where username = ?";
    const result = await sqlQuery(sqlStr, [username]);
    const users = result[0];
    const roles = await getRoles();
    // 通过角色表获取所有角色
    const options = { users, roles };
    res.render('admin/users/selfinfo', options);
})

router.post('/selfimgupload', upload.single('imgfile'),async (req, res) => {
    console.log(req.file);
    let username = req.session.username;
    let result = rename(req)
    //将改名后的结果，上传到数据库
    let strSql = "update user set imgheader = ? where username = ?"
    await sqlQuery(strSql,[result.imgUrl,username])
    res.json(result)
  
})
// 文件重命名
function rename(req){
    //console.log(req.file)
    let oldPath = req.file.destination+"/"+req.file.filename;
    let newPath = req.file.destination+"/"+req.file.filename+req.file.originalname;
    fs.rename(oldPath,newPath,()=>{
        console.log("改名成功")
    })
    return {
      state:'ok',
      imgUrl:"/upload/"+req.file.filename+req.file.originalname
    }
  }
// 获取所有角色
async function getRoles() {
    const sqlStr = "select * from role";
    const result = await sqlQuery(sqlStr);
    return Array.from(result);          
}

router.post('/selfinfo', async (req, res) => {
    console.log(req.body);
    // 更新数据
    const password = jiami(req.body.password);
    const email = req.body.email;
    const mobile = req.body.mobile;
    const roleid = req.body.roleid;
    const username = req.body.username;
    const sqlStr = "update user set password = ?, email = ?, mobile = ?, roleid = ? where username = ?";
    const arr = [password, email, mobile, roleid, username];
    await sqlQuery(sqlStr, arr);
    res.json({
        state: "ok",
        content: "个人信息更新成功"
    })
})

router.use('/userlist1', userListRouter);

module.exports = router;