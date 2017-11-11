const DB = require('../models/db');
const VersionRepo = require('../services/versionRepo');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const ucloud = require('../services/ufileUpload');
const multer = require('koa-multer');
const upload = multer({ dest: 'files/' });

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

router.post('/add', upload.single('file'),async (ctx, next) => {  
  var file = ctx.req.file;
  console.log(file)
  var key = new Date().getTime();
  await ucloud.save(file,key);
  //fs.unlink(path)
  ctx.body = {  
    filename: ctx.req.file//返回文件名  
  }  
});

module.exports = router;
