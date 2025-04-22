import { IUser, IUserModel } from '@/modules/user/user.interface';
import { User } from '@/modules/user/user.model';
import { mongo } from 'mongoose';

export const getUserById = async (id: string): Promise<IUserModel | undefined> => {
  const user = await User.findById(id);
  return user ?? undefined;
};

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

export const userRepository =  {
  getUserById,
  getUserByEmail,
  getUserByAlias,
  createUser
};
