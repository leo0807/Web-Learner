const koa = require('koa');
const app = new koa();

// 配置路由
app.use(async (ctx)=>{
    ctx.body = "Hello World";
});

app.listen(3000);