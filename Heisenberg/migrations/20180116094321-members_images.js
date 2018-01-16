'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('members_images', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          member_id: {
              type: Sequelize.STRING(36)
          },
          images_url: {
              type: Sequelize.STRING
          },
          createdAt: {
              type: Sequelize.DATE
          },
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('members_images');
  }
};
