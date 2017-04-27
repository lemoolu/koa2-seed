/*
用户接口
ctx.query ctx.params ctx.request.body
*/
import Router from 'koa-router';
import { ApiError } from '../error';
import * as user from '../controller/user.js';

let router = Router();
router.prefix('/user');

// 根据id获取用户信息 params: id(用户id)
router.get('/info', async(ctx, next) => {
  ctx.state.permission = ['login', 'user'];
  await next();
  ctx.body = await user.getInfoById(ctx.query.id);
});

// 获取用户列表 params: page(页码), rows(条目数)
router.get('/list', async(ctx, next) => {
  ctx.body = await user.getList({ page: ctx.query.page, rows: ctx.query.rows });
});

// 新建
router.post('/add', async(ctx, next) => {
  ctx.body = await user.add(ctx.request.body);
});

// 更新 email不可修改
router.post('/update', async(ctx, next) => {

});

// 删除 params: id(用户id)
router.post('/del', async(ctx, next) => {

});




export default router;
