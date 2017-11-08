const DB = require('../models/db');
const PromotionRepo = require('../services/promotionRepo');
const router = require('koa-router')();

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
module.exports = router;
