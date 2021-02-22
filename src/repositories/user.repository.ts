import { IUserRepository } from './interfaces/user.repository.interface';
import { User } from '../../db/models/user';
import { IUser } from '../interfaces/user.interface';

export class UserRepository implements IUserRepository {
  update(t: IUser, id: number): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const updated = await User.update({ ...t }, { where: { id, isDeleted: false } });
        resolve(updated as IUser);
      } catch (e) {
        reject(e);
      }
    });
  }

  findAll(): Promise<IUser[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await User.findAll({ where: { isDeleted: false } });
        resolve(
          users.map((u) => {
            return u as IUser;
          })
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  getUserByEmail(userEmail: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ where: { email: userEmail, isDeleted: false } });
        resolve(user as IUser);
      } catch (e) {
        reject(e);
      }
    });
  }

  getUserByDisplayName(displayName: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ where: { displayName, isDeleted: false } });
        resolve(user as IUser);
      } catch (e) {
        reject(e);
      }
    });
  }

  getUserById(userId: number): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ where: { id: userId, isDeleted: false } });
        resolve(user as IUser);
      } catch (e) {
        reject(e);
      }
    });
  }

  save(user: IUser): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = User.build({ ...user });
        await newUser.save();
        resolve(newUser as IUser);
      } catch (e) {
        reject(e);
      }
    });
  }
}
