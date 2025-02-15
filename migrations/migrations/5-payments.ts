'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      payment_id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'order_id',
        },
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      payment_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
};
