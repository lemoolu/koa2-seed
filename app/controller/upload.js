import fs from 'fs';
import path from 'path';
import { ApiError } from '../error';
import cfg from '../config.js';

let uploadDir = cfg.uploadDir; // 文件将要上传到哪个文件夹下面

/*
<form action="/api/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="upload" multiple="multiple">
    <br>
    <button type="submit">Upload</button>
</form>
*/

// 生成文件名
function initName(file) {
  let name = file.name;
  let ext = name.lastIndexOf('.') >= 0 ? name.slice(name.lastIndexOf('.') - name.length) : '';
  let fileType = file.type;
  if (ext === '' && fileType.indexOf('/') >= 0) {
    ext = '.' + fileType.split('/')[1];
  }
  name = Math.random().toString().slice(2) + ext;
  return name;
}

// 移动 重命名
function remove(file) {
  let fromPath = file.path;
  let newName = initName(file);
  let toPath = path.join(uploadDir, newName);
  return new Promise((resolve) => {
    fs.rename(fromPath, toPath, function(err) {
      if (err) {
        resolve(err); // 异常由外部统一处理
      }
      resolve(newName);
    });
  });
}

export default async function(ctx) {
  // 跨域时，先发送一个options请求，此处要返回200
  if (ctx.method === 'OPTIONS') {
    ctx.status = 200;
    ctx.body = 'options OK';
    return;
  }
  // 默认取表单中第一个 input上传的内容 html中必须有name属性
  let files = ctx.request.body.files[Object.keys(ctx.request.body.files)[0]];

  if (files instanceof Array) {
    let result = [];
    for (let file of files) {
      let removeRes = await remove(file);
      if (typeof removeRes !== 'string') {
        throw new ApiError('upload_fail', removeRes.message);
      }
      result.push(cfg.uploadAddress + removeRes);
      ctx.body = result;
    }
    return;
  }
  let removeRes = await remove(files);
  if (typeof removeRes !== 'string') {
    throw new ApiError('upload_fail', removeRes.message);
  }
  ctx.body = cfg.uploadAddress + removeRes;
}
