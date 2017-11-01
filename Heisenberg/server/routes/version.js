const router = require('koa-router')()
const db = require('../models/db');
const version_model = require('../models/version');


router.get('/', async (ctx, next) => {
  var v = version_model(db.sequelize,db.Sequelize.DataTypes);
  ctx.body = await v.findAll();
})  

module.exports = router;
