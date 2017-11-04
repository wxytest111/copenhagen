const router = require('koa-router')()
const db = require('../models/db');
const vm = require('../models/version');


router.get('/version/all', async (ctx, next) => {
  var v = vm(db.sequelize,db.Sequelize.DataTypes);
  ctx.body = await v.findAll();
})  

router.get('/version/last', async (ctx, next) => {
  var v = vm(db.sequelize,db.Sequelize.DataTypes);
  var result = await v.findAll({
    order: [['createAt', 'DESC']],
    limit:1
  });
  ctx.body = result[0];
})  

module.exports = router;
