const koa = require('koa');
const app = new koa();
const Router =  require('koa-router');
const router = new Router();
// 配置路由之前打印日期

app.use(async (ctx, next)=>{
    console.log(new Date());
    if(ctx.status === 404){
        console.log('404 error');
    }
    await next();
    // 如果不写next 之后的路由不会被匹配
});


router.get('/', async (ctx,next)=>{
    // 上下文context 包含了req和response等信息
    ctx.body = 'Home page';
}).get('/newspage', async (ctx, next)=>{
    ctx.body = 'News page';
    console.log(ctx.query); //{aid: '123} 获取的是对象
    console.log(ctx.querystring); //aid=123&name=zhangsan 获取的是一个字符串
    //获取GET传值
    console.log(ctx.request.url);
    console.log(ctx.request.query);
    console.log(ctx.request.querystring);
}).get('/newspage/:aid', async (ctx, next)=>{
    // 动态路由
    console.log(ctx.params); //{aid: '456'}
    
})
// 启动路由
app.use(router.routes())
     .use(router.allowedMethods()); 
app.listen(3000);