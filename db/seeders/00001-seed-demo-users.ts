import {QueryInterface} from "sequelize";
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import {IUser} from "../../src/interfaces/user.interface";

export = {
    up: (queryInterface: QueryInterface) => {
        const demoUsers: IUser[] = [];
        for (let i = 0; i < 5; i++) {
            const displayName = faker.internet.userName();
            demoUsers.push({
                email: `${displayName.toLowerCase()}@mailinator.com`,
                password: bcrypt.hashSync('password', 10), // all demo users password = 'password'
                displayName
            });
        }
        demoUsers.push({
            email: `paystackUser@mailinator.com`,
            password: bcrypt.hashSync('password', 10), // all demo users password = 'password'
            displayName: 'Demo User'
        });
        return queryInterface.bulkInsert('users', demoUsers);
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    }
}
