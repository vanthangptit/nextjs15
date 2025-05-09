import { UserRepository } from '@/modules/user/user.repository';
import { User } from '@/modules/user/user.model';
import { IUser, IUserParams } from '@/modules/user/user.entities';
import { BaseService } from '@/modules/service';
import { mongo } from 'mongoose';

export class UserService extends BaseService {
  private readonly userRepository: UserRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository(User);

    this._makeMethodsFinal({
      checkUserExists: this.checkUserExists,
      getUserByEmail: this.getUserByEmail,
      createUser: this.createUser,
      getUserById: this.getUserById,
      getUserByAlias: this.getUserByAlias
    });
  }

  async checkUserExists(emailOrAlias: string): Promise<boolean> {
    const userAliasFound = await this.getUserByAlias(emailOrAlias);

    if (userAliasFound) {
      return true;
    }

    const userEmailFound = await this.getUserByEmail(emailOrAlias);
    return !!userEmailFound;
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.getUser({ email });
  }

  async getUserByAlias(alias: string): Promise<IUser | null> {
    return this.userRepository.getUser({ alias });
  }

  async createUser(user: IUserParams, session: mongo.ClientSession) {
    return this.userRepository.createUser(user, session);
  }
}