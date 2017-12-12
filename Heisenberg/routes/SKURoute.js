const DB = require('../models/db');
const SKURepo = require('../services/SKURepo');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const ejsExcel=require('ejsexcel');
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

router.prefix("/api/SKU");

router.get('/all', async function (ctx, next) {
  ctx.compress = true;
  // ctx.body = ctx.request.body;
  var vr = await new SKURepo().getAll(ctx.query.key);
  ctx.body = vr;
});


router.get('/last', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new SKURepo().getNew(); 
  ctx.body = vr;
})

router.get('/remove/:id', async function (ctx, next) {
  ctx.compress = true;
  var id = parseInt(ctx.params.id);
  var vr = await new SKURepo().remove(id);
  ctx.body = {
    status: '删除成功',
    code:200,
    result:vr
  };;
})

router.post('/addShop', async function (ctx, next) {
  ctx.body = ctx.request.body;
  var result = await new SKURepo().addShop(ctx.body);
  ctx.body = {
    status: '添加/编辑成功',
    code:200,
    result:result
  };
  
});

router.post('/add', async function (ctx, next) {
  ctx.body = ctx.request.body;
  ctx.body.createAt = new Date().toDateString();
  var result = await new SKURepo().add(ctx.body);
  ctx.body = {
    status: '上传成功',
    code:200,
    result:result
  };
  
})

router.post('/import', upload.single('file'),async function (ctx, next) {
  var file = ctx.req.file;
  console.log(file)
  var key = new Date().getTime();
  var pathName = path.join(__dirname,'/../'+file.path);



  
  let exBuf=fs.readFileSync(pathName);
  ejsExcel.getExcelArr(exBuf).then(exlJson=>{
      console.log("************  read success:getExcelArr");
      let workBook=exlJson;
      let workSheets=workBook[0];
      workSheets.forEach((item,index)=>{
              console.log((index+1)+" row:"+item.join('    '));
      })
  }).catch(error=>{
      console.log("************** had error!");
      console.log(error);
  });


  // var result = await ucloud(pathName, key);
  // console.log(result)
  // fs.unlink(pathName)
  ctx.body ={
    url: "http://console.tman.ai/"+key,
    status:"success"
  };
})

router.post('/pic', upload.single('file'),async function (ctx, next) {
  var file = ctx.req.file;
  console.log(file)
  var key = new Date().getTime();
  var pathName = path.join(__dirname,'/../'+file.path);
  var result = await ucloud(pathName, key);
  console.log(result)
  fs.unlink(pathName)
  ctx.body ={
    url: "http://fujian.ufile.ucloud.com.cn/"+key,
    status:"success"
  };
})

module.exports = router;
