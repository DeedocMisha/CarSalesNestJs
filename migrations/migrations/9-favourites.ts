'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Favourites', {
            favourite_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                references: {
                    model: "Products",
                    key: "product_id", // Исправляем с id на user_id
                },
            },
            user_id: {
                type: Sequelize.UUID,  // Должно совпадать с user_id в Users
                allowNull: false,
                references: {
                    model: "Users",
                    key: "user_id", // Исправляем с id на user_id
                }
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            }
        });
    },
};
