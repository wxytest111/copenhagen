const router = require('koa-router')()
const db = require('../models/db');
const vm = require('../models/version');


router.get('/version/all', async (ctx, next) => {
  var v = vm(db.sequelize,db.Sequelize.DataTypes);
  ctx.body = await v.findAll();
})  

router.get('/version/last', async (ctx, next) => {
  var v = vm(db.sequelize,db.Sequelize.DataTypes);
  ctx.body = await v.findAll({
    order: [['createAt', 'DESC']],
    limit:1
  });
})  

module.exports = router;
