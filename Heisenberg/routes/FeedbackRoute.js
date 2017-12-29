const DB = require('../models/db');
const FeedbackRepo = require('../services/FeedbackRepo');
const router = require('koa-router')();

router.prefix("/api/feedback");

router.get('/getAll', async function (ctx, next) {
  ctx.compress = true;
  var result = await new FeedbackRepo().getAll();
      
  ctx.body = {
    status: '成功',
    code:200,
    result:result
  };

})


router.post('/add', async function (ctx, next) {
  // ctx.body = ctx.query;
  ctx.body = ctx.request.body;
  ctx.body.createdAt = new Date().toDateString();
  //ctx.body.updatedAt = new Date().toDateString();
  var result = await new FeedbackRepo().add(ctx.body);
  ctx.body = {
    status: '添加成功',
    code:200,
    result:result
  };
  
})



module.exports = router;
