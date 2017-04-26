# 说明
添加entry.js作为整个项目入口，在其中引入babel配置，使项目支持import（async await等功能node V6已经支持）


# 命令
* npm run watch(nodemon entry.js) 开发命令 每次js文件修改后，node就会自动重启
* npm run mysql-init 数据库初始化