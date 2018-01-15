/* jshint indent: 2 */
var moment = require('moment'); 
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    label_id: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    label_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_no: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    desc: {
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
    tableName: 'members',    timestamps: false,
  });
};
