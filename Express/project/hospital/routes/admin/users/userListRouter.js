var express = require('express');
var router = express.Router();
const sqlQuery = require('../../../module/lcMysql');
/* GET users listing. */
router.get('/', async function(req, res, next) {
//   查找数据库用户表
    let page = req.query.page;
    page = page ? page : 1
    // 查找语句
    const sqlStr = "select * from user limit ?,5";
    const result = await sqlQuery(sqlStr, [(parseInt(page - 1)) * 5]);
    const options = {
        userlist: Array.from(result)
    }
    res.render('admin/users/userlist1', options)
});
router.get('/deluser', async(req, res) => {
    const dellist = req.body['dellist[]'];
    dellist.forEach((item, i) => {
        const sqlStr = "delete from user where id = ?";
        await sqlQuery(sqlStr, item);
    });
    res.json({
        state: "ok",
        content: "删除成功"
    })
})
module.exports = router;
