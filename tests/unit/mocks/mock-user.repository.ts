import { IUserRepository } from '../../../src/repositories/interfaces/user.repository.interface';
import { IUser } from '../../../src/interfaces/user.interface';

export class MockUserRepository implements IUserRepository {
  private users: IUser[];
  constructor() {
    this.users = [
      {
        id: 1,
        email: 'test@test.com',
        password: '$2b$10$KcChpwL8xYgLDx5GDpZZIemWFRTOA.RAyBP8zAmYrzNPrfU3iP4zS', // text = password
        displayName: 'test',
      },
    ];
  }

  getUserByDisplayName(displayName: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      try {
        const user = this.users.find((u) => {
          return u.displayName === displayName;
        });
        console.log(user);
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  }

  getUserById(userId: number): Promise<IUser> {
    return new Promise((resolve, reject) => {
      try {
        const user = this.users.find((u) => {
          return u.id === userId;
        });
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  }
  getUserByEmail(userEmail: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      try {
        const user = this.users.find((u) => {
          return u.email === userEmail;
        });
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  }

  findAll(): Promise<IUser[]> {
    return Promise.resolve([]);
  }

  save(t: IUser): Promise<IUser> {
    return Promise.resolve(undefined);
  }

  update(t: IUser, id: number): Promise<IUser> {
    return Promise.resolve(undefined);
  }
}
