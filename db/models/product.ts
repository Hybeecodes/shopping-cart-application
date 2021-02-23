import {DataTypes, literal, Model} from "sequelize";
import {databaseService} from "../../src/utils/database";
import {ProductCategory} from "./product-category";

const sequelize = databaseService.sequelize;
export class Product extends Model{}

Product.init({
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
}, {
    sequelize,
    modelName: 'Product'
});

Product.belongsTo(ProductCategory, {foreignKey: 'categoryId', as: 'category'});
