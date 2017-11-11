const DB = require('../models/db');
const PromotionRepo = require('../services/promotionRepo');
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
  socket.sendMsg(vr);
  ctx.body = vr;
})
module.exports = router;
