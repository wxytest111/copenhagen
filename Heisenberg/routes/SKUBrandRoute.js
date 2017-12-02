const DB = require('../models/db');
const SKUBrandRepo = require('../services/SKUBrandRepo');
const router = require('koa-router')();


router.prefix("/api/skubrand");


router.post('/add', async function (ctx, next) {
  ctx.body = ctx.request.body;
  var result = await new SKUBrandRepo().add(ctx.body);
  ctx.body = {
    status: '添加/编辑成功',
    code:200,
    result:result
  };
  
});

router.post('/list', async function (ctx, next) {
  ctx.compress = true;
  ctx.body = ctx.request.body;
  // console.log(ctx.query)
  var vr = await new SKUBrandRepo().getBrandList(ctx.body.name);
  ctx.body = vr;
});

router.get('/remove/:id', async function (ctx, next) {
  ctx.compress = true;
  var id = parseInt(ctx.params.id);
  var vr = await new SKUBrandRepo().remove(id);
  ctx.body = {
    status: '删除成功',
    code:200,
    result:vr
  };
})

module.exports = router;
