const express = require("express");
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send("News Management");
})
// 后台用户管理

module.exports = router;