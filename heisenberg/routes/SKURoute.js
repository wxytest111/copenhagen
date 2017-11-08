
const DB = require('../models/db');
const SKURepo = require('../services/SKURepo');
const SKUInfo = require('..//services/SKUInfo');
const router = require('koa-router')();

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
  // const file = ctx.request.body.files.file;
  // const reader = fs.createReadStream(file.path);
  // const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  // reader.pipe(stream);
  var skuInfo = new SKUInfo();
  skuInfo.name =  ctx.request['name'];
  skuInfo.desc = ctx.request['desc'];
  skuInfo.pic = '';
  // console.log('uploading %s -> %s', file.name, stream.path);
  ctx.compress = true;
  var vr = await new SKURepo().add(skuInfo); 
  ctx.body = skuInfo.toString();
})


module.exports = router;
