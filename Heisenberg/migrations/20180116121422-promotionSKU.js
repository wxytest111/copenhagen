'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('promotionsku', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      promotionid: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }, 
      SKUid: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      priority: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('promotionsku');
  }
};
