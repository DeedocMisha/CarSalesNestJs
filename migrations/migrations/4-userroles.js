'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserRoles', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
      },
      role_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Roles',
          key: 'role_id',
        },
      },
    }, {
      // Опции для создания составного первичного ключа
      uniqueKeys: {
        actions_unique: {
          fields: ['user_id', 'role_id'],
        },
      },
    });
  },
};
