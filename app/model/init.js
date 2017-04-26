// 需要数据库初始化时执行该脚本！！！

import { User } from './index.js';
import sequelize from './sequelize';

async function init() {
  await sequelize.sync({ force: true });
  let jane = await User.create({
    name: 'admin',
    password: 'admin',
    email: 'admin@163.com',
    isAdmin: true
  });
  console.log(jane.get({
    plain: true
  }));
}

init();
