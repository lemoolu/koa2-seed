import { ApiError } from './error';

// 数据转化成表格格式
export function formaterToList(rows, page, data) {
  return {
    rows: rows,
    page: 1,
    data: data.rows,
    count: data.count
  };
}
