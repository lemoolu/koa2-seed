// post 'application/json' JSON.stringify
import Router from 'koa-router';
import userRouter from './user.js';
import loginRouter from './login.js';
import upload from '../controller/upload.js';

const api = Router();
api.prefix('/api');

api.all('/upload', upload);

api.use(userRouter.routes(), userRouter.allowedMethods());
api.use(loginRouter.routes(), loginRouter.allowedMethods());

export default api;
