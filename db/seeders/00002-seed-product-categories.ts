import {QueryInterface} from "sequelize";
import * as faker from 'faker';
import {IProductCategory} from "../../src/interfaces/product-category.interface";

export = {
    up: (queryInterface: QueryInterface) => {
        const categories: IProductCategory[] = [];
        for (let i = 0; i< 5; i++) {
            categories.push({
                name: faker.commerce.department()
            });
        }
        return queryInterface.bulkInsert('productCategories', categories);
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete('productCategories', null, {});
    }
}
