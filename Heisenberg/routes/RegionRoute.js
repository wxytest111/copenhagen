const DB = require('../models/db');
const RegionRepo = require('../services/RegionRepo');
const router = require('koa-router')();


router.prefix("/api/region");


router.post('/add', async function (ctx, next) {
  ctx.body = ctx.request.body;
  // ctx.body.createAt = new Date().toDateString();
  var result = await new RegionRepo().add(ctx.body);
  ctx.body = {
    status: '添加成功',
    code:200,
    result:result
  };
  
})

router.post('/update', async function (ctx, next) {
  ctx.body = ctx.request.body;
  // ctx.body.createAt = new Date().toDateString();
  var result = await new RegionRepo().update(ctx.body);
  ctx.body = {
    status: '编辑成功',
    code:200,
    result:result
  };
  
})

router.get('/remove/:id', async function (ctx, next) {
  ctx.compress = true;
  var id = parseInt(ctx.params.id);
  var vr = await new RegionRepo().remove(id);
  ctx.body = {
    status: '删除成功',
    code:200,
    result:vr
  };;
})

router.get('/RSlist', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new RegionRepo().getRSList(ctx.query.ancestor_key);
  ctx.body = vr;
});

router.get('/list', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new RegionRepo().getRegionList(ctx.query.ancestor_key);
  ctx.body = vr;
});

router.get('/parent', async function (ctx, next) {
  ctx.compress = true;
  var vr = await new RegionRepo().getParent(ctx.query.id);
  ctx.body = vr;
});

module.exports = router;
