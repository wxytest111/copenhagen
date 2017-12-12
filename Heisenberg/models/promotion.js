/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('promotion', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
    
  }, {
    tableName: 'promotion',    timestamps: false, 
  });
};
