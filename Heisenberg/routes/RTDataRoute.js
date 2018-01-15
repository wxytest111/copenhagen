const DB = require('../models/db');
const RTData = require('../services/RTDataRepo');
const router = require('koa-router')();


router.prefix("/api/RTData");

router.post('/ages', async function (ctx, next) {
  ctx.body = ctx.request.body;
  // ctx.body.createAt = new Date().toDateString();
  ctx.compress = true;
  var vr = await new RTData().ages(ctx.body);
  ctx.body = vr;
  
})

router.get('/list', async function (ctx, next) {
  ctx.body = ctx.request.body;
  // ctx.body.createAt = new Date().toDateString();
  ctx.compress = true;
  var dao =  new RTData();
  var vr = await dao.getListByShop(ctx.query.shop_id);
  for (let index = 0; index < vr.length; index++) {
    var pcount = await dao.pCount(vr[index].pid,ctx.query.shop_id);
    if(pcount){
      vr[index].dataValues.count = pcount;
    } else {
      vr[index].dataValues.count = 1;
    }
  }
  console.log(vr)
  ctx.body = vr;
  
})

module.exports = router;
