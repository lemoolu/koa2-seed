import Koa from 'koa';
import views from 'koa-views';
import json from 'koa-json';
import onerror from 'koa-onerror';
import Bodyparser from 'koa-bodyparser';
import KoaBody from 'koa-body';
import logger from 'koa-logger';
import session from 'koa-session2';

import { resFormatter, checkPermission } from './app/middleware';
import rule from './app/api/api-permission-cfg.js';
import api from './app/api';

import index from './routes/index';

const app = new Koa();
// error handler
onerror(app);

// middlewares
app.use(session({
  key: 'SESSIONID',
  maxAge: 30 * 60 * 1000 // (30分钟有效期)
}));
app.use(KoaBody({
  multipart: true,
  formidable: { uploadDir: __dirname + '/public/uploads' }
}));
// app.use(json());
// app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// 允许跨域
app.use(async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With');
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  await next();
});


// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


app.use(resFormatter('^/api')); // res formatter
app.use(checkPermission(rule)); // permission check

// api
app.use(api.routes(), api.allowedMethods());
// routes
app.use(index.routes(), index.allowedMethods());


module.exports = app;
