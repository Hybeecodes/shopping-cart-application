import {DataTypes, QueryInterface} from "sequelize";

export = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('productCategories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING
            },
            isDeleted: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('productCategories');
    }
}
