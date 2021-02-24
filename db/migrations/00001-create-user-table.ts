import {DataTypes, literal, QueryInterface} from "sequelize";

export = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            displayName: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING
            },
            email: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING
            },
            resetCode: {
                allowNull: true,
                type: DataTypes.STRING,
                defaultValue: null
            },
            isDeleted: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                defaultValue: literal('CURRENT_TIMESTAMP'),
                type: DataTypes.DATE,
            },

            updatedAt: {
                allowNull: false,
                defaultValue: literal('CURRENT_TIMESTAMP'),
                type: DataTypes.DATE,
            },
        });
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('users');
    }
}
