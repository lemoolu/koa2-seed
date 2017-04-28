// TODO 性能优化

import { ApiError } from '../error';
import { User } from '../model';

const KEY_LOGIN = 'login';

export default function(rule = {}) {
  let keys = Object.keys(rule);
  let regs = keys.map(x => new RegExp(x));

  return async(ctx, next) => {
    let permissions = []; // 当前接口所需要的权限列表
    regs.forEach((x, i) => {
      if (x.test(ctx.originalUrl)) {
        permissions.push(...rule[keys[i]]);
      }
    });
    if (permissions && permissions.length > 0) {
      if (!ctx.session.email) {
        throw new ApiError('need_login');
      }
      let list = permissions.filter(x => x !== KEY_LOGIN); // 需要的权限列表
      // let user = await User.findOne({ where: { email: ctx.session.email } });
      // console.log(user.permissions);
      // console.log(list);
    }
    await next();
  };
}
