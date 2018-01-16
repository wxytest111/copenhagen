'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('members_label', {
      id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
      },
      type: {
        type: Sequelize.STRING(255),
      },
      mode: {
        type: Sequelize.STRING(18),
      },
      count: {
        type: Sequelize.INTEGER,
      },
      desc: {
        type: Sequelize.STRING(255),
      },
      color: {
        type: Sequelize.STRING(10),
      },
      statistics: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('members_label');
  }
};
