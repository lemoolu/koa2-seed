import { User } from '../model';
import { ApiError } from '../error';
import { formaterToList } from '../common.js';
import cfg from '../config.js';

// 获取信息
export async function getInfoById(id) {
  let data = await User.findById(id);
  if (!data) {
    throw new ApiError('user_not_exist');
  }
  return data;
}

// 获取列表
export async function getList({ page, rows } = {}) {
  page = parseInt(page, 10) || 1;
  rows = parseInt(rows, 10) || cfg.listRows;
  let data = await User.findAndCountAll({ limit: rows, offset: (page - 1) * rows });
  return formaterToList(rows, page, data);
}

// 添加
export async function add(newData) {
  let data = await User.create(newData).catch((e) => {
    throw new ApiError('user_create_fail', e.errors);
  });
  return data;
}

export async function update() {
  return 'update';
}

export async function del() {
  return 'del';
}

export async function loginIn({ email, password } = {}) {
  if (!email || email === '') {
    throw new ApiError('login_need_email');
  }
  if (!password || password === '') {
    throw new ApiError('login_need_password');
  }
  let data = await User.findOne({
    where: { email, password }
  });
  if (!data) {
    throw new ApiError('login_fail');
  }
  return data;
}
