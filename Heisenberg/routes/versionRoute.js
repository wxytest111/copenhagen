const DB = require('../models/db');
const VersionRepo = require('../services/versionRepo');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const ucloud = require('../services/ufileUpload');
const crypto = require('crypto');
const path = require('path');
const multer = require('koa-multer');
var storage = multer.diskStorage({
  destination: './files/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

const upload = multer({ storage: storage })

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
  var pathName = path.join(__dirname,'/../'+file.path);
  var result = await ucloud(pathName, key);
  console.log(result)
  //fs.unlink(path)
  ctx.body ={
    url: "http://fujian.ufile.ucloud.com.cn/"+key,
    status:"success"
  };
});

module.exports = router;
