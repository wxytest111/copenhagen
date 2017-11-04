const router = require('koa-router')();
const db = require('../models/db');
const vm = require('../models/version');
var compress = require('koa-compress');
router.get('/api', async (ctx, next) => {
  ctx.body = "error address";
}) 

router.get('/api/version/all', async (ctx, next) => {
  ctx.compress = true
  var v = vm(db.sequelize,db.Sequelize.DataTypes);
  ctx.body = await v.findAll();
})  

router.get('/api/version/last', async (ctx, next) => {
  ctx.compress = true
  var v = vm(db.sequelize,db.Sequelize.DataTypes);
  var result = await v.findAll({
    order: [['createAt', 'DESC']],
    limit:1
  });
  ctx.body = result[0];
})  

module.exports = router;
