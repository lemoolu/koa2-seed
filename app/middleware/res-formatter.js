// 接口格式化输出
import { ApiError } from '../error';

let responseFormatter = (ctx) => {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: ctx.body || null
  };
  ctx.status = 200;
};

const urlFilter = function(pattern) {
  return async(ctx, next) => {
    const reg = new RegExp(pattern);
    try {
      await next();
      if (reg.test(ctx.originalUrl)) {
        responseFormatter(ctx);
      }
    } catch (error) {
      // 如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
      if (error instanceof ApiError && reg.test(ctx.originalUrl)) {
        ctx.status = 200;
        ctx.body = {
          code: error.code,
          msg: error.msg,
          data: error.name
        };
      }
    }
  };
};

export default urlFilter;
