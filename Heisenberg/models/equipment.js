/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('equipment', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    equipment_ID: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('1','2','3'),
      allowNull: false
    },
    shop_id: {
      type: DataTypes.STRING(38),
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'equipment',timestamps: false,
  });
};
