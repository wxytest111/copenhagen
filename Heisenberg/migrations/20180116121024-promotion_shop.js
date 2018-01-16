'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('promotion_shop', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      shopid: {
        type: Sequelize.STRING(38),
      },
      promotionid: {
        type: Sequelize.INTEGER,
      }
     });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('promotion_shop');
  }
};
