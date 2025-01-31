'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Ratings', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            rating_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                unique: true,
            },
            user_id: {
                type: Sequelize.UUID,  // Должно совпадать с типом user_id в Users
                allowNull: false,
                references: {
                    model: "Users",
                    key: "user_id", // Исправляем с id на user_id
                },
                onDelete: "CASCADE",
            },
            product_id: {
                type: Sequelize.UUID,  // Должно совпадать с product_id в Products
                allowNull: false,
                references: {
                    model: "Products",
                    key: "product_id", // Исправляем с id на product_id
                },
                onDelete: "CASCADE",
            },
            rating: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
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
    }
};
