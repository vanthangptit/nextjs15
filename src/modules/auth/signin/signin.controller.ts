import { startSession } from 'mongoose';
import { ISignInRequest } from './signup.interface';
import { logger } from '@/modules/logging';
import signInService from './signin.service';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';


export const signIn = async (user: ISignInRequest, cookies: ReadonlyRequestCookies) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { status, message, data } =
      await signInService.validateRequestSignIn(user);
    if (status !== 200) {
      return logger.appError(message, status);
    }

    const {
      status: statusToken,
      message: messageToken,
      data: dataToken
    } =
      await signInService.getTokenSignIn(data.userFound.id, session, cookies);
    if (statusToken !== 200) {
      return logger.appError(messageToken, statusToken);
    }

    await session.commitTransaction();
    await session.endSession();

    return logger.appSuccessfully('Sign in successfully!', {
      ...dataToken,
      user: {
        roles: data.userFound.roles,
        fullName: data.userFound.fullName
      }
    });
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    return logger.appError(e.message);
  }
};

export const signInController = {
  signIn
};