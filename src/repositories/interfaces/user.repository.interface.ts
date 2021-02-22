import { IReposiory } from './reposiory.interface';
import { IUser } from '../../interfaces/user.interface';

export interface IUserRepository extends IReposiory<IUser> {
  getUserById(userId: number): Promise<IUser>;
  getUserByEmail(userEmail: string): Promise<IUser>;
  getUserByDisplayName(displayName: string): Promise<IUser>;
}
