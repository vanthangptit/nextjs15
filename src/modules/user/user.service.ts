import { UserRepository } from '@/modules/user/user.repository';
import { User } from '@/modules/user/user.model';
import { IUser, IUserParams } from '@/modules/user/user.entities';
import { mongo } from 'mongoose';

export class UserService {
  #userRepository: UserRepository;

  constructor() {
    this.#userRepository = new UserRepository(User);
  }

  async _checkUserExists(emailOrAlias: string): Promise<boolean> {
    const userAliasFound = await this._getUserByAlias(emailOrAlias);

    if (userAliasFound) {
      return true;
    }

    const userEmailFound = await this._getUserByEmail(emailOrAlias);
    return !!userEmailFound;
  }

  async _getUserById(id: string): Promise<IUser | null> {
    return this.#userRepository.read({ _id: id });
  }

  async _getUserByEmail(email: string): Promise<IUser | null> {
    return this.#userRepository.read({ email });
  }

  async _getUserByAlias(alias: string): Promise<IUser | null> {
    return this.#userRepository.read({ alias });
  }

  async _createUser(user: IUserParams, session: mongo.ClientSession) {
    return this.#userRepository.save(user, session);
  }
}