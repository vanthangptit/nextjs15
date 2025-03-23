import userRepository from '@/modules/user/user.repository';
import { IUserModel } from '@/modules/user/user.interface';
import { mongo } from 'mongoose';
import { passwordHash } from '@/utils/helpers';
import { ISignupRequest } from '@/modules/auth/signup/signup.interface';

const signUp = async (user: ISignupRequest, session: mongo.ClientSession): Promise<IUserModel> => {
  const { firstName, lastName, email, password } = user;
  return await userRepository.createUser(
    {
      alias: email?.toString?.()?.split?.('@')[0],
      firstName,
      lastName,
      email,
      password: password ? await passwordHash(password) : null
    },
    session,
  )
}

export default {
  signUp
}
