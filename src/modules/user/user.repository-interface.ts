import { mongo } from 'mongoose';
import { IUser, IUserParams } from '@/modules/user/user.entities';

export interface IUserRepository {
  getUser(_params: any): Promise<IUser | null>;
  getUserById(_id: string): Promise<IUser | null>;
  createUser(_params: IUserParams, _session: mongo.ClientSession): Promise<void>;
  deleteUser(_id: string, _session: mongo.ClientSession): Promise<void>;
}
