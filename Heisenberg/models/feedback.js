/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedback', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'feedback',    timestamps: false,
  });
};
