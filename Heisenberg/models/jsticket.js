'use strict';
module.exports = (sequelize, DataTypes) => {
  var JsTicket = sequelize.define('JsTicket', {
    ticket: DataTypes.STRING(512),
    expires_in: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return JsTicket;
};