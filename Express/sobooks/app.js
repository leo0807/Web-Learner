const sqlQuery = require("./mysql");
const express = require('express')
const app = express()
const port = 3000;
// 使用模版来渲染页面
const ejs = require("ejs");
// 将模版引擎与express相关联
// 设置对应的视图
app.set("views", "view");
// 设置默认的模版引擎
app.set("view engine", "ejs");
// 定义模版引擎
app.engine('ejs', ejs.__express);

app.get('/', async (req, res) => {
    let strSql = "select id,bookName,bookImg,authorName,category from book limit 0, 28";
    let result = await sqlQuery(strSql);
    // let resJson = JSON.stringify(Array.from(result));
    // res.send(resJson);
    // res.json(Array.from(result)); 
    res.render('index.ejs', { title: "My Home Page" });
});
app.get('/xiaoshuwenxue', async (req, res) => {
    let strSql = "select id,bookName,bookImg,authorName,category from book where category = '文学小说' limit 0,28";
    let result = await sqlQuery(strSql);
    res.json(Array.from(result)); 
});
app.get('/books/:bookid', async (req, res) => {
    let strSql = "select * from book where id = ?";
    let bookid = req.params.bookid;
    let result = await sqlQuery(strSql, [bookid]);
    res.json(Array.from(result)); 
});
app.listen(port, () => console.log(`Example app listening on port port!`))

module.exports = app;