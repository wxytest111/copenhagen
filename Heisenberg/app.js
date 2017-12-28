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
const TestRoute = require('./routes/testRoute');
const Index = require('./routes/indexRoute');
// var cors = require('koa-cors');


// app.use(cors());
// test only, will move to other module later
const PromotionMsg = require("./services/promotionMsg")


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

// process.env.PORT=8080;

// monitor uCloud MQ subscription

//PromotionMsg.publish(); 

module.exports = app
