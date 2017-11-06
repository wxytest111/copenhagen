const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const compress = require('koa-compress')
const websockify = require('koa-websocket');
const VersionRoute = require('./routes/versionRoute')
const SocketRoute = require('./routes/socketRoute')
const router = require('koa-router')();
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
app.use(VersionRoute.routes(), VersionRoute.allowedMethods())

const sapp = websockify(new Koa());
sapp.ws.use(function(ctx, next) {
  console.log("sfdsfsdfs")
  // return `next` to pass the context (ctx) on to the next ws middleware
  return next(ctx);
});

sapp.ws.use(router.all('/', (ctx) => {
  console.log("sfdsfs")
 ctx.websocket.send('successfuly connect!'+i);
  // the websocket is added to the context as `ctx.websocket`.
 ctx.websocket.on('message', function(message) {
   // print message from the client
   console.log(message);
 });
}));
//sapp.ws.use(SocketRoute.routes(), SocketRoute.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
