/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SKU', {
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
    identity: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: ''
    },
    code: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: ''
    },
    input_code: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: ''
    },
    SKU_type_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    SKU_brand_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'SKU',    timestamps: false,  
  });
};
