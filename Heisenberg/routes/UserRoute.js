const DB = require('../models/db');
const UserRepo = require('../services/UserRepo');
const router = require('koa-router')();
const crypto = require('crypto');

router.prefix("/api/user");

Base64 = function (content) {
  return new Buffer(content).toString('base64');
}

HmacSha1 = function (secretKey, content) {
  var hmac = crypto.createHmac('sha1', secretKey);
  hmac.update(content);
  return hmac.digest();
}

router.post('/login', async function (ctx, next) {
  ctx.compress = true;
  ctx.body = ctx.query;
  // ctx.body = ctx.request.body;
  var vr = await new UserRepo().login(ctx.body.username);
  if(vr){
    if(Base64(HmacSha1('tman', ctx.body.password))==vr.password){
      vr.password = undefined;
      if(vr.status=='1'){
        
        ctx.body = {
          status: '登录成功',
          code:200,
          result:vr
        };
      } else {
        ctx.body = {
          status: '该用户已被禁用',
          code:400003
        };
      }
    } else {
      ctx.body = {
        status: '密码错误',
        code:400001
      };
    }
  } else {
    ctx.body = {
      status: '用户名不存在',
      code:400002
    };
  }
})


router.post('/add', async function (ctx, next) {
  ctx.body = ctx.query;
  // ctx.body = ctx.request.body;
  ctx.body.password = Base64(HmacSha1('tman', ctx.body.password));
  ctx.body.createdAt = new Date().toDateString();
  ctx.body.updatedAt = new Date().toDateString();
  var result = await new UserRepo().add(ctx.body);
  ctx.body = {
    status: '添加成功',
    code:200,
    result:result
  };
  
})



module.exports = router;
