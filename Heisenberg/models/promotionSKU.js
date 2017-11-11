/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('promotionSKU', {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      promotionid: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true,
        defaultValue: 0
      }, 
      SKUid: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true,
        defaultValue: 0
      },
      priority: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true,
        defaultValue: 0
      },
    
    }, {
      tableName: 'promotionsku',    timestamps: false,  
    });
  };
  