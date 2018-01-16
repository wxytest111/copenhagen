'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('real_time_data', { 
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      gid: {
        type: Sequelize.STRING(36),
        allowNull: false
      },
      pid: {
        type: Sequelize.STRING(36),
        allowNull: false
      },
      news: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      shop_id: {
        type: Sequelize.STRING(36),
        allowNull: false
      },
      sensor: {
        type: Sequelize.STRING(36),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('3','2','1'),
      },
      hat: {
        type: Sequelize.ENUM('3','2','1'),
      },
      glass: {
        type: Sequelize.ENUM('3','2','1'),
      },
      age: {
        type: Sequelize.INTEGER(3),
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      tag: {
        type: Sequelize.STRING(255),
      },
      duration: {
        type: Sequelize.INTEGER(13),
        allowNull: true
      },
      offset: {
        type: Sequelize.INTEGER(20),
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('real_time_data');
  }
};
