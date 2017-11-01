/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('version', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    version: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    message: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      defaultValue: ''
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      defaultValue: ''
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    is_need: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    mobile_type: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'version',
    timestamps: false,    
  });
};
