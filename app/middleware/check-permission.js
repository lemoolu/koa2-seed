import { ApiError } from '../error';
import { User } from '../model';

const KEY_LOGIN = 'login';

export default async function(ctx, next) {
  if (ctx.state.permission && ctx.state.permission.length > 0) {
    // 当权限列表 个数大于 1 时，即必须登陆
    if (!ctx.session.email) {
      throw new ApiError('need_login');
    }
    let list = ctx.state.permission.filter(x => x !== KEY_LOGIN); // 需要的权限列表
    let user = await User.findOne({ where: { email: ctx.session.email } });
    console.log(user.permissions);
    console.log(list);
  }
  next();
};
