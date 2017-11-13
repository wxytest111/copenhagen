const DB = require('../models/db');
const PromotionRepo = require('../services/promotionRepo');
const SKURepo = require('../services/SKURepo');
const router = require('koa-router')();
const socket = require("./socketRoute");

router.prefix("/api/promotion");

router.get('/all', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new PromotionRepo().getAll();
  ctx.body = vr;
  
});


router.get('/last', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new PromotionRepo().getNew(); 
  ctx.body = vr;
})

router.get('/promotion', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new PromotionRepo().getPromotion();
  ctx.body = vr;
})

router.post('/add', async function (ctx, next) {
  ctx.body = ctx.request.body;
  var result = await new PromotionRepo().add(ctx.body);
  ctx.body = {
    status: '添加推荐成功',
    code:200,
    result:result
  };
  
})
router.post('/ps', async function (ctx, next) {
  ctx.body = ctx.request.body;
  var s = new SKURepo().getByCode(ctx.body.SKUid);
  console.log(s);
  ctx.body.SKUid = s.id;
  var result = await new PromotionRepo().ps(ctx.body);
  ctx.body = {
    status: '添加绑定成功',
    code:200,
    result:result
  };
  
})

router.get('/remove/:id', async function (ctx, next) {
  ctx.compress = true;
  var id = parseInt(ctx.params.id);
  var vr = await new PromotionRepo().remove(id);
  ctx.body = {
    status: '删除成功',
    code:200,
    result:vr
  };;
})
module.exports = router;
