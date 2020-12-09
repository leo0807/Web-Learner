const koa = require('koa');
const app = new koa();
const Router =  require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const views = require("koa-views");
const static = require('koa-static');
const artTemplate = require('koa-art-template');
const path = require('path');
// 配置路由之前打印日期
app.use(async (ctx, next)=>{
    console.log(new Date());
    await next();
    // 如果不写next 之后的路由不会被匹配
});
// 
app.use(static('static'));
// 配置body parser 中间件
app.use(bodyParser());
app.use(views('views',{
    extension: 'ejs'
}));

// 配置koa-art-template
artTemplate(app, {
    root: path.join(__dirname, 'views'),//视图的位置
    extname: '.html', //后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
})
router.get('/', async (ctx) => {
    const list = {
        name: 'junxu',
        h:'<h2>This is an h2 element</h2>'
    }
    await ctx.render('index', {
        list:list
    });
})
// 接收post提交的数据
router.post('/doAdd', async (ctx) => {
    ctx.body = ctx.request.body;
})
// 启动路由
app.use(router.routes());
app.use(router.allowedMethods()); 
app.listen(3000);