import {DataTypes, literal, QueryInterface} from "sequelize";

export = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            sku: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            sellingPrice: {
                allowNull: false,
                type: DataTypes.DECIMAL,
            },
            stockLevel: {
                allowNull: false,
                defaultValue: 0,
                type: DataTypes.INTEGER,
            },
            expDate: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'productCategories',
                    key: 'id'
                },
                allowNull: false
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
        })
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('products')
    }
}
