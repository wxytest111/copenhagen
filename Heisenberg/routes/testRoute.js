

const router = require('koa-router')();
const SKUInfo = require('../services/SKUInfo');
router.prefix("/api/test");

router.get('/', async function (ctx, next) {
  ctx.compress = true;
  var sku = new SKUInfo();
  sku.id = 100;

  ctx.body = sku;
  
});

module.exports = router;
