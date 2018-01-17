'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SKU_brand_type', { 
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      sku_brand_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      sku_type_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SKU_brand_type');
  }
};
