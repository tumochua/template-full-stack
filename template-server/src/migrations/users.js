"use strict";
// import { v4 as uuidv4 } from 'uuid';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                type: Sequelize.STRING,
                primaryKey: true,
                // defaultValue:uuidv4()
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
            },
            firstName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            fullName: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            roleId: {
                type: Sequelize.STRING,
                defaultValue: 'R0'
            },
            refresh_token: {
                type: Sequelize.STRING,
            },
            userIdAuth: {
                type: Sequelize.STRING,
            },

            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            typeLogin: {
                type: Sequelize.STRING,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),

            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
