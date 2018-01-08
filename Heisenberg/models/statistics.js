/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statistics', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    transId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    faceId: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    personId: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    storeNo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    posNo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    },
    emotion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    offset: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    ts: {
      type: DataTypes.DATE,
      
      allowNull: false,
      get() {
        return moment(this.getDataValue('ts')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    startTime: {
      type: DataTypes.DATE,
      
      allowNull: true,
      get() {
        return moment(this.getDataValue('startTime')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    tableName: 'statistics',    timestamps: false,
  });
};
