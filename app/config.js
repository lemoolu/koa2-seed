import path from 'path';

export default {
  listRows: 20, // 列表默认条目数
  uploadDir: path.join(__dirname, '../public/uploads'), // 文件上传目录
  uploadAddress: '/uploads/', // 上传文件外部访问地址
};
