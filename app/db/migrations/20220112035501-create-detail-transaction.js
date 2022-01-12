'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetailTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.INTEGER
      },
      book: {
        type: Sequelize.INTEGER
      },
      titleBook: {
        type: Sequelize.STRING
      },
      imageBook: {
        type: Sequelize.STRING
      },
      priceBook: {
        type: Sequelize.INTEGER
      },
      quantity: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DetailTransactions');
  }
};