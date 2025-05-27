import { mongo } from 'mongoose';
import { IUserRepository } from '@/modules/user/user.repository-interface';
import { IUser, IUserParams } from '@/modules/user/user.entities';
import { BaseRepository } from '@/modules/repository';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  async getUser(params: any): Promise<IUser | null> {
    return this.database.findOne({ ...params });
  }
  async getUserById(id: string): Promise<IUser | null> {
    return this.database.findOne({ id });
  }

  async createUser(user: IUserParams, session: mongo.ClientSession) {
    await this.database.create([{ ...user }], { session });
  }
  
  async deleteUser(id: string, session: mongo.ClientSession) {
    await this.database.deleteMany({ id }).session(session);
  }
}
