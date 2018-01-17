'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SKU', { 
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ''
      },
      desc: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        defaultValue: ''
      },
      pic: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: ''
      },
      identity: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: ''
      },
      code: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: ''
      },
      input_code: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: ''
      },
      SKU_type_code: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: ''
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: '0.00'
      },
      SKU_brand_code: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: ''
      },
      SKU_type_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: ''
      },
      SKU_brand_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: ''
      },
      createAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
        defaultValue: '0'
      },
      rule_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SKU');
  }
};
