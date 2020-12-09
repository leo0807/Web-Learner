const koa = require('koa');
const app = new koa();
const Router =  require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const views = require("koa-views");
const static = require('koa-static');
const artTemplate = require('koa-art-template');
const path = require('path');
const DB = require('./module/db');
const { request } = require('http');

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
// Show the member
router.get('/', async (ctx) => {
    const result = await DB.find('user',{})
    await ctx.render('index', {
        list:result
    });
})

// add
router.get('/add', async (ctx) => {
    await ctx.render('add');
})

router.get('/edit', async (ctx) => {
    const id = ctx.query.id;
    const data = await DB.find('user', { '_id':DB.getObjectID(id)});
    await ctx.render('edit',{
        list: data[0]
    });
})
router.post('/doEdit', async (ctx) => {
    
    const id = ctx.request.body.id;
    const username = ctx.request.body.name;
    const age = ctx.request.body.age;
    const sex = ctx.request.body.sex;
    const data = await DB.update('user', { '_id': DB.getObjectID(id) }, { username, age, sex });


    try {
        if (data.result.ok) {
            ctx.redirect('/');
        }
    } catch (error) {
        console.log(error);
        ctx.redirect('/add');
    }
})



router.get('/update', async (ctx) => {
    const result = await DB.update('user', { 'username': 'haha' }, {'username': 'huhuhhu'});
    ctx.body = result;
    console.log(result.result);
})
// delete member
router.get('/remove', async (ctx) => {
    const id = ctx.query.id;
    const data = await DB.remove('user', { '_id': DB.getObjectID(id) });
    if (data) ctx.redirect('/');
})

// 接收post提交的数据
router.post('/doAdd', async (ctx) => {
    const data =  await DB.insert('user',ctx.request.body);
    // const result = await DB.insert('user', { 'username': data.username, 'age': data.age, 'sex': data.sex });
    try {
        if (data.result.ok) {
            ctx.redirect('/');
        }
    } catch (error) {
        console.log(error);
        ctx.redirect('/add');
    }

})
// 启动路由
app.use(router.routes());
app.use(router.allowedMethods()); 
app.listen(3000, () => console.log("Server is running"));