'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('regionsku', { 
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      regionid: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      SKUid: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('regionsku');
  }
};
