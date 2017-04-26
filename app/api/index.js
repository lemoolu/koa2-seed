import Router from 'koa-router';
import user from './user.js';

let router = Router();
router.prefix('/api');


let modules = [user];
let apis = [];
modules.map((item) => {
  item.routes().router.stack.map((x) => {
    apis.push({
      url: x.path,
      methods: x.methods
    });
  });
});


router.get('/', function(ctx, next) {
  ctx.body = apis;
});


router.use(user.routes(), user.allowedMethods());

export default router;
