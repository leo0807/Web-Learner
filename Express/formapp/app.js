var express = require('express');
var path = require('path');
const app = require('../sobooks/app2');
// const port = 4000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.ejs');
});
// 自己封装提取get方式表单数据
app.get('/search', (req, res) => {
  let queryStr = req.url.split('?')[1];
  let keyValueArr = queryStr.split('&');
  // 对表单键值对进行分割，将键值对以对象的属性形式进行保存
  let query = {};
  keyValueArr.forEach(function (item, i) {
    // 对键值对进行分割提取
    let key = item.split('=')[0];
    let value = item.split('=')[1];
    query[key] = value;
  })
  res.send("1234");
})
app.get('/search1', (req, res) => {
  // 使用express自带对get获取数据方式
  // express在req对象上直接封装好了query方法
  console.log(req.query);
  res.send("search");
})

// app.listen(port, () => "server is running on port " + port);
module.exports = app;
