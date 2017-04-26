import Koa from 'koa';
import views from 'koa-views';
import json from 'koa-json';
import onerror from 'koa-onerror';
import Bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';

import { resFormatter } from './app/middleware';
import api from './app/api';

import index from './routes/index';

const app = new Koa();
const bodyparser = Bodyparser();
// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// api res formatter
app.use(resFormatter('^/api'));
app.use(api.routes(), api.allowedMethods());

// routes
app.use(index.routes(), index.allowedMethods());

module.exports = app;
