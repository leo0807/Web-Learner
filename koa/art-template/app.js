const koa = require('koa');
const app = new koa();
const Router =  require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const views = require("koa-views");
const static = require('koa-static');
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

router.get('/', async (ctx)=>{
    await ctx.render('index');
})
// 接收post提交的数据
router.post('/doAdd', async (ctx) => {
    ctx.body = ctx.request.body;
})
// 启动路由
app.use(router.routes());
app.use(router.allowedMethods()); 
app.listen(3000);