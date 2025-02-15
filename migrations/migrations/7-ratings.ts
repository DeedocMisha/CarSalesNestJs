'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Ratings', {
            rating_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                references: {
                    model: "Products",
                    key: "product_id",
                },
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
