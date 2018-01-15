/* jshint indent: 2 */
var moment = require('moment'); 
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members_images', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    member_id: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    images_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      
      allowNull: true,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    tableName: 'members_images',    timestamps: false,
  });
};
