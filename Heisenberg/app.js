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
app.use(TestRoute.routes(), TestRoute.allowedMethods());


process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// monitor uCloud MQ subscription
 
PromotionMsg(); 

module.exports = app
