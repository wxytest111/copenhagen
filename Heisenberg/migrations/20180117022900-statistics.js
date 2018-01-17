'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('statistics', { 
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      transId: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      faceId: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      personId: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      storeNo: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      posNo: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      age: {
        type: Sequelize.INTEGER(3),
        allowNull: true
      },
      emotion: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      offset: {
        type: Sequelize.INTEGER(20),
        allowNull: true
      },
      ts: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('statistics');
  }
};
