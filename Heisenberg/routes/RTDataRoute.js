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

module.exports = router;
