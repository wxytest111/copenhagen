/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    region_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    region_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    tel: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    nature: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: ''
    },
    pic: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: ''
    },
    desc: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: ''
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'shop',timestamps: false,
  });
};
