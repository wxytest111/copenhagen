const DB = require('../db/DB');
const VersionRepo = require('../db/VersionRepo');
const router = require('koa-router')();

router.prefix("/api/version");

router.get('/all', async function (ctx, next) {
  ctx.compress = true;
  var connection = await new DB().init();
  var vr = new VersionRepo(connection);
  console.log(connection);
  var result =  await vr.getAll(connection);
  ctx.body = result;
  
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router;
