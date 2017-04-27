// 需要数据库初始化时执行该脚本！！！

import { User, Permission } from './index.js';
import sequelize from './sequelize';

async function init() {
  await sequelize.sync({ force: true });

  // 用户表模块初始化
  User.create({
    name: 'admin',
    password: 'admin',
    email: 'admin@163.com',
    isAdmin: true
  });

  // 权限模块初始化
  Permission.create({
    name: '用户模块',
    model: 'user',
    key: 1
  });
}

init();
