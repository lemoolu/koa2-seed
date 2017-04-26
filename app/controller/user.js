import { User } from '../model';
import { ApiError } from '../error';
import { formaterList } from '../common.js';
import cfg from '../config.js';

// 获取信息
export async function getInfo(id) {
  let data = await User.findOne({ where: { id } });
  if (!data) {
    throw new ApiError('USER_NOT_EXIST');
  }
  return data;
}

// 获取列表
export async function getList({ rows, page } = {}) {
  page = parseInt(page) || 1;
  rows = parseInt(rows) || cfg.listRows;
  let data = await User.findAndCountAll({ limit: rows, offset: (page - 1) * rows });
  return formaterList(rows, page, data);
}
