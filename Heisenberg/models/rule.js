/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rule', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sex: {
      type: DataTypes.ENUM('女','男','全部'),
      allowNull: true,
      defaultValue: '全部'
    },
    age_start: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    },
    age_end: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    },
    eyeglasses: {
      type: DataTypes.ENUM('否','是'),
      allowNull: true,
      defaultValue: '否'
    }
  }, {
    tableName: 'rule',timestamps: false,
  });
};
