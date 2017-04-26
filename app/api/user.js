/*
用户接口
ctx.query ctx.params ctx.request.body
*/
import Router from 'koa-router';
import { User } from '../model';
import { ApiError } from '../error';
import * as user from '../controller/user.js';

let router = Router();
router.prefix('/user');

// 根据id获取用户信息 params: id(用户id)
router.get('/info', async(ctx) => {
  ctx.body = await user.getInfo(ctx.query.id);
});

// 获取用户列表 params: page(页码), rows(条目数)
router.get('/list', async(ctx) => {
  ctx.body = await user.getList({ page: ctx.query.page, rows: ctx.query.rows });
});

// 新建 'application/json' JSON.stringify
router.post('/add', async(ctx) => {
  ctx.body = await user.add(ctx.request.body);
});

// 更新
router.post('/update', async(ctx) => {
  ctx.body = '更新';
});

// 删除
router.post('/del', async(ctx) => {
  ctx.body = '删除';
});

export default router;
