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

router.get('/list', async function (ctx, next) {
  ctx.compress = true;
  // console.log(ctx.query)
  var vr = await new ShopRepo().getShopList(ctx.query.region_id);
  ctx.body = vr;
});

router.get('/remove/:id', async function (ctx, next) {
  ctx.compress = true;
  var id = parseInt(ctx.params.id);
  var vr = await new ShopRepo().remove(id);
  ctx.body = {
    status: '删除成功',
    code:200,
    result:vr
  };
})

module.exports = router;
