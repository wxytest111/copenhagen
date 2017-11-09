const DB = require('../models/db');
const SKURepo = require('../services/SKURepo');
const router = require('koa-router')();
const fs = require('fs');
router.prefix("/api/SKU");

router.get('/all', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new SKURepo().getAll();
  ctx.body = vr;
  
});


router.get('/last', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new SKURepo().getNew(); 
  ctx.body = vr;
})

router.post('/add', async function (ctx, next) {
  console.log(ctx.request.body.lenth);
  console.log('name is '+ctx.request['name']);
  console.log('querystring is '+ctx.querystring);
  console.log('url is '+ctx.url);
  // const file = ctx.request.body.files.file;
  // const reader = fs.createReadStream(file.path);
  // var filepath = path.join(os.tmpdir(), Math.random().toString())
  // const stream = fs.createWriteStream(filepath);
  // reader.pipe(stream);
  // var skuInfo = require('..//services/SKUInfo');
  // skuInfo.name =  ctx.request['name'];
  // skuInfo.desc = ctx.request['desc'];
  // skuInfo.pic = filepath;
  // // console.log('uploading %s -> %s', file.name, stream.path);
  // ctx.compress = true;
  // var vr = await new SKURepo().add(skuInfo); 
  // ctx.body = '添加成功';
})


module.exports = router;
