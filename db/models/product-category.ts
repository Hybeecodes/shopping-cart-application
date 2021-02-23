import {DataTypes, Model} from "sequelize";
import {databaseService} from "../../src/utils/database";

const sequelize = databaseService.sequelize;
export class ProductCategory extends Model{}

ProductCategory.init({
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
}, {
    sequelize,
    modelName: 'ProductCategory'
});
