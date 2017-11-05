const DB = require('../models/db');
const VersionRepo = require('../services/VersionRepo');
const router = require('koa-router')();

router.prefix("/api/version");

router.get('/all', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new VersionRepo().getAll();
  ctx.body = vr;
  
});


router.get('/last', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new VersionRepo().getNew(); 
  ctx.body = vr;
})

module.exports = router;
