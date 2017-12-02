/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SKU_brand_type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sku_brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sku_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'SKU_brand_type'
  });
};
