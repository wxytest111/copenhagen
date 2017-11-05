/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SKU_type_tree', {
    ancestor_key: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    member_key: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    distance: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    is_leaf: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'SKU_type_tree'
  });
};
