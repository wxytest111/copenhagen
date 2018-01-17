'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', { 
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('1','0'),
        allowNull: false,
        defaultValue: '1'
      },
      rule_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};
