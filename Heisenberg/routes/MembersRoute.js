const DB = require('../models/db');
const MembersRepo = require('../services/MembersRepo');
const router = require('koa-router')();


router.prefix("/api/members");


router.post('/add', async function (ctx, next) {
 
  
})

router.post('/update', async function (ctx, next) {
  ctx.body = ctx.request.body;
  // ctx.body.createAt = new Date().toDateString();
  var result = await new MembersRepo().update(ctx.body);
  if(ctx.body.id){
    ctx.body = {
      status: '编辑成功',
      code:200,
      result:result
    };
  } else {
    ctx.body = {
      status: '添加成功',
      code:200,
      result:result
    };
  }
  
})

router.get('/remove/:id', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new MembersRepo().remove(ctx.params.id);
  ctx.body = {
    status: '删除成功',
    code:200,
    result:vr
  };;
})

router.get('/one', async function (ctx, next) {
  ctx.compress = true;
  // ctx.body = ctx.query;
  ctx.body = ctx.request.body;
  var vr = await new MembersRepo().getOne(ctx.body.id);
  ctx.body = vr;
});

router.get('/list', async function (ctx, next) {
  ctx.compress = true;
  // ctx.body = ctx.query;
  ctx.body = ctx.request.body;
  var vr = await new MembersRepo().getList(ctx.body.label_id);
  ctx.body = vr;
});

module.exports = router;
