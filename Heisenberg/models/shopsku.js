/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shopsku', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shopid: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    SKUid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'shopsku', timestamps: false,
  });
};
