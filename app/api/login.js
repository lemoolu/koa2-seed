/*
登陆
*/
import Router from 'koa-router';
import * as user from '../controller/user.js';
import { ApiError } from '../error';

let router = Router();
router.prefix('/login');

// 登陆
router.post('/in', async(ctx) => {
  let data = await user.loginIn({ email: ctx.request.body.email, password: ctx.request.body.password });
  ctx.session.email = ctx.request.body.email;
  ctx.body = data;
});

// 退出
router.get('/out', async(ctx) => {
  ctx.session.email = null;
});


export default router;
