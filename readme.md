# 说明
添加entry.js作为整个项目入口，在其中引入babel配置，使项目支持import（async await等功能node V6已经支持）


# 命令
* npm run watch(nodemon entry.js) 开发命令 每次js文件修改后，node就会自动重启
* npm run mysql-init 数据库初始化

## 流程
* Model层，使用sequelize定义数据结构，包括数据校验
* Control层，纯函数，调用Model，对Model进行增删改查，并返回结果到API（数据错误抛出尽量在这一层）
* API层，权限控制，调用Control实现业务

## 中间件
* check-permission 权限验证中间件，设置ctx.state.permission = ['login', 'user']来验证该接口所需要的权限，否则抛出异常
* res-formater 返回数据格式化
