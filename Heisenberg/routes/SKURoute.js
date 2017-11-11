const DB = require('../models/db');
const SKURepo = require('../services/SKURepo');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
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
  ctx.body = ctx.request.body;
  console.log(ctx.body.name);
  console.log('ctx.body.files'+ctx.body.file);
  

 // console.log('the file content is : '+ctx.body.files.length.toString());
  
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
