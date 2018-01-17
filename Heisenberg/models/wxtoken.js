'use strict';
module.exports = (sequelize, DataTypes) => {
  var WxToken = sequelize.define('WxToken', {
    access_token: DataTypes.STRING,
    expires_in: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return WxToken;
};