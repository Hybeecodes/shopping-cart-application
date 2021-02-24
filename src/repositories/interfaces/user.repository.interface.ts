import { IRepository } from './repository.interface';
import { IUser } from '../../interfaces/user.interface';

export interface IUserRepository extends IRepository<IUser> {
  getUserById(userId: number): Promise<IUser>;
  getUserByEmail(userEmail: string): Promise<IUser>;
  getUserByDisplayName(displayName: string): Promise<IUser>;
}
