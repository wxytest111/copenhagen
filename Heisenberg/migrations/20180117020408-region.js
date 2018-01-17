'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('region', { 
      id: { 
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ''
      },
      status: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
        defaultValue: '0'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('region');
  }
};
