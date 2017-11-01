'user strict'

const db = require('./models/db');
const version = require('./models/version');

var vs = function(){
    var v = version(db.sequelieze,db.sequelieze.DataTypes);
    console.log(v);
}

module.exports = vs;