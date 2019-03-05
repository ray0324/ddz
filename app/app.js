const Koa = require('koa');
const koaStatic = require('koa-static');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');

const auth = require('./auth');

const app = new Koa();

async function onError(ctx, next) {
  try {
    await next();
  } catch (e) {
    console.log(ctx.status)
    // 设置状态码为 200 - 服务端错误
    ctx.status = 200;
    // 输出详细的错误信息
    ctx.body = {
      code: -1,
      err_msg: e.message
    };
  }
};

// middlewares
app.use(cors());
app.use(onError);
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }));
app.use(json());
app.use(koaStatic(__dirname + '/static'));
// 注册用户
app.use(auth);

module.exports =  app;
