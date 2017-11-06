const router = require('koa-router')();
const websockify = require('koa-websocket');

router.prefix("/api/socket");

router.get('/test', async function (ctx, next) {
  ctx.compress = true;
  for (let i=0;i<1000;i++){
    ctx.websocket.send('successfuly connect!'+i);
  }
  var vr = await new VersionRepo().getAll();
  ctx.websocket.on('message', function(message) {
    console.log(message);
  });
  
});

module.exports = router;
