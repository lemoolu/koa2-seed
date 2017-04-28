// post 'application/json' JSON.stringify
import Router from 'koa-router';
import userRouter from './user.js';
import loginRouter from './login.js';

const api = Router();
api.prefix('/api');

api.get('/', function(ctx) {
  ctx.body = 'api';
});

api.use(userRouter.routes(), userRouter.allowedMethods());
api.use(loginRouter.routes(), loginRouter.allowedMethods());

export default api;
