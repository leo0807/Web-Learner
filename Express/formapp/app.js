var express = require('express');
var path = require('path');
const app = express();
// const port = 4000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 解析=》用于POST请求
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// 添加中间件
app.use(function (req, res, next) {
  
  let splitRes = req.url.split('?');
  if (splitRes > 0) {
    let queryStr = splitRes[1];
    console.log(queryStr);
    // 对表单提交对键值进行分割
    let keyValueArr = queryStr.split('&');
    // 设置一个query对象
    let query = {};
    keyValueArr.forEach(function (item, i) {
      // searchKey = admin
      let key = item.split('=')[0];
      let value = item.split('=')[1];
      query[key] = value;
    })
    req.MyQuery = query;
    next();
    // 没有next（）则截获
  }
  else {
    next();
  }
  console.log("访问任何页面，此函数都会被调用");
  res.addNum = function (a, b) {
    return a + b
  }
  next()
})

app.get('/', (req, res) => {
  res.setHeader('Content-type', 'text/html');
  res.send("hello" + res.addNum(3 + 5));
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

// 实例话路由模块，相当于一个小对app实例
// 商城的首页
const router = express.Router();
router.use(function (req, res, next) {
  console.log('Judge whether there is a coustmer');
})
router.get('/', (req, res) => {
  res.send('Shopping Center Homepage');
})
router.get('/list', (req, res) => {
  res.send('Shopping Center List Page');
})
app.use('/mall', router);
module.exports = app;
