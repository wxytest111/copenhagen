/* jshint indent: 2 */
var moment = require('moment');  
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedback', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      
      allowNull: true,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    }
    }
  }, {
    tableName: 'feedback',
    timestamps: false
  });
};
