'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('region_tree', { 
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ancestor_key: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false
      },
      member_key: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false
      },
      distance: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false
      },
      is_leaf: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('region_tree');
  }
};
