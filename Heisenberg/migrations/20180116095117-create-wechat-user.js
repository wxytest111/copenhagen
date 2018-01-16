'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WechatUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      openid: {
        type: Sequelize.STRING
      },
      nick_name: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      head_img_url: {
        type: Sequelize.STRING
      },
      subscribe_time: {
        type: Sequelize.DATE
      },
      remark: {
        type: Sequelize.STRING
      },
      group_id: {
        type: Sequelize.INTEGER
      },
      language: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.STRING
      },
      access_token: {
        type: Sequelize.STRING
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      unionid: {
        type: Sequelize.STRING
      },
      tagid_list: {
        type: Sequelize.STRING
      },
      scope: {
        type: Sequelize.STRING
      },
      expires_in: {
        type: Sequelize.INTEGER
      },
      subscribe: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('WechatUsers');
  }
};