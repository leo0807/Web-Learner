const express = require('express')
const app = express()
const port = 3000
// 1.字符串路由模式
app.get('/', (req, res) => res.send('Hello World!'));
// 2.类字符串的正则模式
// 例如模糊匹配多个路径
// 如匹配两个路径abcd浊者acd
app.get('/ab?cd', (req, res) => res.send('ab?cd'));
// 3.regex
app.get('/\a\d{10,}/', (req, res) => res.send("News Page"));
// 4.Dynamic Router
app.get('/news/:categoryid/a:newsid', (req, res) => res.send("Dynamic Router"+ req.params.newsid +"categoryid"+req.params.categoryid));
app.listen(port, () => console.log(`Example app listening on port port!`))