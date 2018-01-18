'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('members', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(36)
            },
			entity_id: {
			  type: Sequelize.STRING(36),
			  allowNull: false,
			},
			mobile: {
			  type: Sequelize.STRING(11),
			},
			division: {
			  type: Sequelize.STRING(11),
			},
			dept: {
			  type: Sequelize.STRING(11),
			},
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            label_id: {
                type: Sequelize.STRING(36)
            },
            label_name: {
                type: Sequelize.STRING
            },
            id_type: {
                type: Sequelize.STRING
            },
            id_no: {
                type: Sequelize.STRING(18)
            },
            desc: {
                type: Sequelize.STRING
            },
            createdAt: {
                type: Sequelize.DATE
            },
        })
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('members');
    }
};
