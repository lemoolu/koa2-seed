/*
权限
 */
import Sequelize from 'sequelize';
import sequelize from './sequelize';

const Permission = sequelize.define(
  'permission', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '权限名称',
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      comment: '对应模块',
    },
    key: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      comment: '模块对应key',
    }
  }, {
    timestamps: false,
    paranoid: true, // 删除时不进行物理删除
  }
);

sequelize.sync();

export default Permission;
