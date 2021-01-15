const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

app.use();
router.get('/', async ctx => {
    ctx.body = 'start';
})

app.use(router.routes());
app.listen(3000)