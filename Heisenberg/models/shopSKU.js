/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('shopSKU', {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      shopid: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true,
        defaultValue: 0
      }, 
      SKUid: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true,
        defaultValue: 0
      },
    
    }, {
      tableName: 'shopsku',    timestamps: false,  
    });
  };
  