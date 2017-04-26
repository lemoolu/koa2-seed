/*
用户数据结构
 */
import Sequelize from 'sequelize';
import sequelize from './sequelize';

const User = sequelize.define(
  'user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '用户名',
      validate: {
        len: [3, 20],
      },
      get: function() {
        return this.getDataValue('name');
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '密码'
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      },
      comment: '邮箱',
    },
    phone: {
      type: Sequelize.STRING,
      unique: true,
      comment: '手机号'
    },
    qq: {
      type: Sequelize.STRING,
      comment: 'qq'
    },
    weibo: {
      type: Sequelize.STRING,
      comment: '微博'
    },
    wechat: {
      type: Sequelize.STRING,
      comment: '微信'
    },
    sex: {
      type: Sequelize.ENUM('man', 'woman', 'unkown'),
      defaultValue: 'unkown',
      comment: '性别'
    },
    sign: {
      type: Sequelize.STRING,
      comment: '签名',
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: '是否为管理员'
    },
    permissions: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '权限等级 0为普通用户'
    },
    comment: {
      type: Sequelize.STRING,
      defaultValue: '',
      comment: '备注'
    },
  }, {
    timestamps: true,
    paranoid: true, // 删除时不进行物理删除
    getterMethods: {}, // 获取时添加一些处理后的参数
    setterMethods: {}, // 存储时进行处理
    validate: {}, // 一些组合校验
  }
);

export default User;
