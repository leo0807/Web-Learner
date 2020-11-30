var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
// 引入session
const session = require('express-session');
// 上传模块
const multer = require('multer');
// 配置上传对象
const upload = multer({ dest: "./public/upload" });
// 配置session
app.use(session({
  secret: "sdfjkhdscvbjug",
  resave: true,
  cookie: {
    // maxAge: 7*24*60*60*1000,
  },
  saveUninitialized: true
}))

var indexRouter = require('./routes/index');//  前台路由
var usersRouter = require('./routes/users');//  后台路由
// 引入后台模块
const adminRouter = require('./routes/admin/adminRouter');
const loginRouter = require('./routes/register/loginRegister');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// 后台路由
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
// 注册登陆模块
app.use('/rl', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
