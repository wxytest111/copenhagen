'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shop', { 
      id: {
        type: Sequelize.STRING(38),
        allowNull: false,
        primaryKey: true
      },
      region_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false
      },
      region_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ''
      },
      tel: {
        type: Sequelize.STRING(11),
        allowNull: true
      },
      nature: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      address: {
        type: Sequelize.STRING(1000),
        allowNull: true,
        defaultValue: ''
      },
      pic: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: ''
      },
      desc: {
        type: Sequelize.STRING(1000),
        allowNull: true,
        defaultValue: ''
      },
      status: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
        defaultValue: '0'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shop');
  }
};
