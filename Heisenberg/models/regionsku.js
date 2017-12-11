/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('regionsku', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    regionid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    SKUid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'regionsku', timestamps: false,
  });
};
