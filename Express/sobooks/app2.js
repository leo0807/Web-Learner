const sqlQuery = require("./mysql");
const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    let strSql = "select id,bookName,bookImg,authorName,category from book limit 0, 28";
    let result = await sqlQuery(strSql);
    // let resJson = JSON.stringify(Array.from(result));
    // res.send(resJson);
    res.json(Array.from(result)); 
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