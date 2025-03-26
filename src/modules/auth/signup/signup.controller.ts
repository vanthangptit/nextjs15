import { startSession } from 'mongoose';
import userService from '@/modules/user/user.service';
import { logger } from '@/modules/logging';
import { ISignupRequest } from './signup.interface';
import authService from './signup.service';

const signUp = async (user: ISignupRequest) => {
  const session = await startSession();
  session.startTransaction();

  if (user.passwordConfirm !== user.password) {
    return logger.appError('Password not matched', 400);
  }

  try {
    const userFound = await userService.checkUserExists(user.email);
    if (userFound) {
      return logger.appError('Email already exists', 400);
    }

    await authService.signUp(user, session);

    /** @todo: Add send mail
     *  @todo google cloud (Oauth2 - blog-website)
     *  https://console.cloud.google.com/apis/credentials?project=blog-website-404616&supportedpurview=project
     **/

    await session.commitTransaction();
    await session.endSession();

    return logger.appSuccessfully('User created successfully');
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    return logger.appError(e?.message);
  }
};

export const signUpController = {
  signUp
};