import Router from 'koa-router';
import user from './user.js';

let router = Router();
router.prefix('/api');

router.get('/', function(ctx, next) {
  ctx.body = 'api v1';
});

router.use(user.routes(), user.allowedMethods());

export default router;
