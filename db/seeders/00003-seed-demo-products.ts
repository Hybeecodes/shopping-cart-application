import {QueryInterface} from "sequelize";
import {IProduct} from "../../src/interfaces/product.interface";
import * as faker from 'faker';

export = {
    up: (queryInterface: QueryInterface) => {
        const products: IProduct[] = [];
        for (let i =0; i < 10; i++) {
            products.push({
                name: faker.commerce.productName(),
                expDate: faker.date.future(),
                sellingPrice: faker.commerce.price(),
                sku: `PROD-${i+1}`,
                stockLevel: Math.floor(Math.random() * 20) + 1,
                categoryId: Math.floor(Math.random() * 5) + 1
            });
        }
        return queryInterface.bulkInsert('products', products);
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete('products', null, {});
    }
}
