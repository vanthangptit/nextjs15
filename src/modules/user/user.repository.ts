import { IUser, IUserModel } from '@/modules/user/user.interface';
import { User } from '@/modules/user/user.model';
import { mongo } from 'mongoose';

const getUserByEmail = (email: string): Promise<IUserModel | undefined> => {
  const user = User.findOne({ email });
  return user;
};

const getUserByAlias = (alias: string): Promise<IUserModel | undefined> => {
  const user = User.findOne({ alias });
  return user;
};

const createUser = async (user: IUser, session: mongo.ClientSession): Promise<IUserModel> => {
  const userCreated = await User.create([user], { session });
  return userCreated[0];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserByEmail,
  getUserByAlias,
  createUser
};
