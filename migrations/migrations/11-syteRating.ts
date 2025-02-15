  'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SyteRating', {
      payment_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false, // Запрещаем NULL
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE', // Если user_id в Users изменится, он обновится здесь
      },


      rating: {
        type: Sequelize.INTEGER,
      },

      comment: {
        type: Sequelize.STRING,
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
