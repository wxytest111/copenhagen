const DB = require('../models/db');
const VersionRepo = require('../services/versionRepo');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const ucloud = require('../services/ucloud_put');

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

router.post('/add', async function(ctx, next){
  console.log(ctx.request);
  // ctx.compress = true;
  // ctx.body = ctx.request.body;
  // console.log(ctx.body)
  // const file = ctx.body.files.file;
  // console.log(file)
  
  // const reader = fs.createReadStream(file.path);
  // ucloud(file.path,file.path);
  
});

module.exports = router;
