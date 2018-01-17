'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('version', { 
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      version: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: ''
      },
      message: {
        type: Sequelize.STRING(2000),
        allowNull: false,
        defaultValue: ''
      },
      content: {
        type: Sequelize.STRING(2000),
        allowNull: true,
        defaultValue: ''
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: ''
      },
      is_need: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: '0'
      },
      mobile_type: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: '0'
      },
      status: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
        defaultValue: '0'
      },
      createAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: ''
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('version');
  }
};
