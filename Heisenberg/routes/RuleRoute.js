const DB = require('../models/db');
const RuleRepo = require('../services/RuleRepo');
const router = require('koa-router')();


router.prefix("/api/rule");


router.post('/add', async function (ctx, next) {
  ctx.body = ctx.request.body;
  var result = await new RuleRepo().add(ctx.body);
  ctx.body = {
    status: '编辑成功',
    code:200,
    result:result
  };
  
});



module.exports = router;
