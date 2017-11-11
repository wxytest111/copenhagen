const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const compress = require('koa-compress')
const VersionRoute = require('./routes/versionRoute')
const SocketRoute = require('./routes/socketRoute')
const PromotionRoute = require('./routes/promotionRoute')
const SKURoute = require('./routes/SKURoute')
const TestRoute = require('./routes/testRoute');
const socket = require("./routes/socketRoute");

// test only, will move to other module later
var umqclient = require('umq-nodejs-sdk')
var config = require('./config/uCloudConfig');
var assert = require('assert');
const promotionRepo = require('./services/promotionRepo');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// compress
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

// routes
app.use(VersionRoute.routes(), VersionRoute.allowedMethods());
app.use(PromotionRoute.routes(), PromotionRoute.allowedMethods());
app.use(SKURoute.routes(), SKURoute.allowedMethods());
app.use(TestRoute.routes(), TestRoute.allowedMethods());



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// monitor uCloud MQ subscription
 async function sub(s) {
  var succCount = 0;
  
  s.on("data", async (message) => {
    var msgId = message.messageID;
    var msg= message.content.toString();
    console.log("receive message", msgId, msg);
    if(msg!='')
    {
      // var p = new PromotionRepo();
      
      var vr =  await (new promotionRepo()).getPromotion(msg);
      console.log('before send to socket: '+msg);
      socket.sendMsg(vr);
      
    }
    s.ackMessage([msgId]).then(() => {
      console.log("ack message " + msgId+'\n');
    }).catch(err => {
      console.error(err);
      testPubSub();
    });
    
   
  });
  
}
 function testPubSub() {
  let client = umqclient.newUmqClient({
    host: config.Host,
    projectId: config.ProjectId,
    timeout: 5000,
  });
  let s = client.createSubscription(config.ConsumerId, config.ConsumerToken, config.Topic, 10);
  sub(s);
}

testPubSub();
module.exports = app
