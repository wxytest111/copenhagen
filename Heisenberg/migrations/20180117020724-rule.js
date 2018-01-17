'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rule', { 
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      sex: {
        type: Sequelize.ENUM('女','男','全部'),
        allowNull: true,
        defaultValue: '全部'
      },
      age_start: {
        type: Sequelize.INTEGER(3),
        allowNull: true
      },
      age_end: {
        type: Sequelize.INTEGER(3),
        allowNull: true
      },
      eyeglasses: {
        type: Sequelize.ENUM('否','是'),
        allowNull: true,
        defaultValue: '否'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rule');
  }
};
