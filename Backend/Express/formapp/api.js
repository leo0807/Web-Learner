const express = require('express');

const api = express.Router();
// 中间件允许前端跨域
api.use(function (req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");//允许所有源
    res.append("Access-Control-Allow-Content-Stype", "*");//允许所有访问类型
    next();
})

api.get('/book/:cid/:pid', (req, res) => {
    let sqlStr = "select * from book where";

    res.json()
})