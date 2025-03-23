import { IUser, IUserModel } from '@/modules/user/user.interface';
import { User } from '@/modules/user/user.model';
import { mongo } from 'mongoose';

const getUserByEmail = (email: string): Promise<IUserModel | undefined> => {
  return User.findOne({email});
}

const getUserByAlias = (alias: string): Promise<IUserModel | undefined> => {
  return User.findOne({ alias });
}

const createUser = async (user: IUser, session: mongo.ClientSession): Promise<IUserModel> => {
  const userCreated = await User.create([user], { session });
  return userCreated[0];
}

export default {
  getUserByEmail,
  getUserByAlias,
  createUser,
}
