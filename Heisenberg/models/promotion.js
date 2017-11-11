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
        allowNull: true,
        defaultValue: ''
      },
      desc: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: ''
      }
    
    }, {
      tableName: 'promotion',    timestamps: false,  
    });
  };
  