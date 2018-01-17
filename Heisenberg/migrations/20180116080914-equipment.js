'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('equipment', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          equipment_ID: {
              type: Sequelize.STRING(20)
          },
          type: {
              type: Sequelize.ENUM('3','2','1')
          },
          shop_id: {
              type: Sequelize.STRING(38)
          },
          desc: {
              type: Sequelize.STRING
          },

      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('equipment');
  }
};
