const DB = require('../models/db');
const SKUTypeRepo = require('../services/SKUTypeRepo');
const router = require('koa-router')();


router.prefix("/api/skutype");


router.post('/add', async function (ctx, next) {
  ctx.body = ctx.request.body;
  // ctx.body.createAt = new Date().toDateString();
  var result = await new SKUTypeRepo().add(ctx.body);
  ctx.body = {
    status: '添加成功',
    code:200,
    result:result
  };
  
})

router.get('/remove/:id', async function (ctx, next) {
  ctx.compress = true;
  var id = parseInt(ctx.params.id);
  var vr = await new SKUTypeRepo().remove(id);
  ctx.body = {
    status: '删除成功',
    code:200,
    result:vr
  };
})

router.get('/tree', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new SKUTypeRepo().getSKUTypeParent(ctx.query.name);
  ctx.body = vr;
});

router.get('/type', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new SKUTypeRepo().getSKUType(ctx.query.ancestor_key);
  ctx.body = vr;
});

router.get('/parent', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new SKUTypeRepo().getParent(ctx.query.id);
  ctx.body = vr;
});

module.exports = router;
