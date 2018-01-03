const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const compress = require('koa-compress')
const VersionRoute = require('./routes/versionRoute')
const PromotionRoute = require('./routes/promotionRoute')
const SKURoute = require('./routes/SKURoute')
const SKUTypeRoute = require('./routes/SKUTypeRoute')
const SKUBrandRoute = require('./routes/SKUBrandRoute')
const RegionRoute = require('./routes/RegionRoute')
const ShopRoute = require('./routes/ShopRoute')
const EquipmentRoute = require('./routes/EquipmentRoute')
const RuleRoute = require('./routes/RuleRoute')
const UserRoute = require('./routes/UserRoute')
const FeedbackRoute = require('./routes/FeedbackRoute')
const PromotionMsg = require("./services/promotionMsg")
const TestRoute = require('./routes/testRoute');
const Index = require('./routes/indexRoute');

// const cors = require('koa-cors');
// app.use(cors());


const session = require('koa-session');


app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 1800000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));





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


  // console.log('path',ctx.path)
  // console.log('session',ctx.session.user)


  if(!ctx.session.user && ctx.path != '/api/user/login'){
    console.log('--------------------未登录---------------------')
    ctx.body = {
      status: '未登录',
      code:400000,
    };
    return;
  }

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
app.use(SKUTypeRoute.routes(), SKUTypeRoute.allowedMethods());
app.use(SKUBrandRoute.routes(), SKUBrandRoute.allowedMethods());
app.use(RegionRoute.routes(), RegionRoute.allowedMethods());
app.use(ShopRoute.routes(), ShopRoute.allowedMethods());
app.use(EquipmentRoute.routes(), EquipmentRoute.allowedMethods());
app.use(RuleRoute.routes(), RuleRoute.allowedMethods());
app.use(TestRoute.routes(), TestRoute.allowedMethods());
app.use(UserRoute.routes(), UserRoute.allowedMethods());
app.use(FeedbackRoute.routes(), FeedbackRoute.allowedMethods());
app.use(Index.routes(), Index.allowedMethods());



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


// const Consumer = require("./routes/consumer")
// Consumer();
// const Consumer1 = require("./routes/consumer1")
// Consumer1();

// process.env.PORT=8080;

// monitor uCloud MQ subscription

//PromotionMsg.publish(); 

module.exports = app
