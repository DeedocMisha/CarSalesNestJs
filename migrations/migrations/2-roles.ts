'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      role_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(100),
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
};
