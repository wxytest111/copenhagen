/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('real_time_data', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gid: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    pid: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    news: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    shop_id: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    sensor: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('3','2','1'),
      allowNull: true
    },
    hat: {
      type: DataTypes.ENUM('3','2','1'),
      allowNull: true
    },
    glass: {
      type: DataTypes.ENUM('3','2','1'),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER(13),
      allowNull: true
    },
    offset: {
      type: DataTypes.INTEGER(20),
      allowNull: false
    }
  }, {
    tableName: 'real_time_data',timestamps: false,
  });
};
