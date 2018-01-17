'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shopsku', { 
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      shopid: {
        type: Sequelize.STRING(38),
        allowNull: true
      },
      SKUid: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shopsku');
  }
};
