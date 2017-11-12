const router = require('koa-router')();

router.get('/',function(ctx,next){
    serve("index.html");
});

module.exports = router;
