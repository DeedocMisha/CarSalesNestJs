'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      product_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      rating_id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,

      },
      name: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DOUBLE,
        unique: true,
        allowNull: false,
      },
      stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      favourite_id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      }
    });
  },
};
