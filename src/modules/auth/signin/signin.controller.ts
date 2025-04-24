import { startSession } from 'mongoose';
import { ISignInRequest } from './signup.interface';
import { logger } from '@/modules/logging';
import { signInService } from './signin.service';
import { STATUS_CODE } from '@/utils/constants';

const signIn = async (user: ISignInRequest) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { status, message, data } =
      await signInService.validateRequestSignIn(user);
    if (status !== STATUS_CODE.SUCCESS) {
      return logger.appError(message, status);
    }

    const {
      status: statusToken,
      message: messageToken,
      data: dataToken
    } =
      await signInService.getTokenSignIn(data.userFound.id, session);
    if (statusToken !== STATUS_CODE.SUCCESS) {
      return logger.appError(messageToken, statusToken);
    }

    await session.commitTransaction();
    await session.endSession();

    return logger.appSuccessfully('Sign in successfully!', {
      ...dataToken
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