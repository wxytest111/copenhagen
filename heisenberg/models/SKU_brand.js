/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SKU_brand', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    desc: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: ''
    },
    pic: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: ''
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'SKU_brand'
  });
};
