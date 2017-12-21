const DB = require('../models/db');
const ShopRepo = require('../services/ShopRepo');
const router = require('koa-router')();


router.prefix("/api/shop");


router.post('/add', async function (ctx, next) {
  ctx.body = ctx.request.body;
  var result = await new ShopRepo().add(ctx.body);
  ctx.body = {
    status: '添加/编辑成功',
    code:200,
    result:result
  };
  
});

router.post('/list', async function (ctx, next) {
  ctx.compress = true;
  ctx.body = ctx.request.body;
  var vr = await new ShopRepo().getShopList(ctx.body.region_id);
  ctx.body = vr;
});

router.get('/remove/:id', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new ShopRepo().remove(ctx.params.id);
  ctx.body = {
    status: '删除成功',
    code:200,
    result:vr
  };
})

module.exports = router;
