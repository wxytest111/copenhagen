'use strict';
module.exports = (sequelize, DataTypes) => {
  var WechatUser = sequelize.define('WechatUser', {
    open_id: DataTypes.STRING,
    nick_name: DataTypes.STRING,
    sex: DataTypes.INTEGER,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    head_img_url: DataTypes.STRING,
    subscribe_time: DataTypes.DATE,
    remark: DataTypes.STRING,
    group_id: DataTypes.INTEGER,
    language: DataTypes.STRING,
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    access_token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    unionid: DataTypes.STRING,
    tagid_list: DataTypes.STRING,
    scope: DataTypes.STRING,
    expires_in: DataTypes.INTEGER,
    subscribe: DataTypes.INTEGER,
    openid: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // WechatUser.belongsTo(models.Member, {foreignKey:'member_id', targetKey:'id'});
        // associations can be defined here
      }
    }
  });
  return WechatUser;
};