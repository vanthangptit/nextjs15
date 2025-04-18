import { startSession } from 'mongoose';
import { logger } from '@/modules/logging';
import { IFContextSignOut } from '@/utils/types';
import { cookies } from 'next/headers';
import { AUTH_SESS_ID_NAME } from '@/constants/auth';
import { Token } from '@/modules/auth/refreshToken/refreshToken.model';
import { signOutService } from '@/modules/auth/signout/signout.service';

const signOut = async (context: IFContextSignOut) => {
  const cookieStore = await cookies();
  const session = await startSession();
  session.startTransaction();

  const { userAuth } = context;
  const refreshToken = cookieStore.get(AUTH_SESS_ID_NAME)?.value;

  try {
    const userTokenFound = await Token.findOne({ refreshToken, user: userAuth.id });
    if (!userTokenFound) {
      return logger.appError('User not found', 404);
    }
    await signOutService.deleteRefreshToken(userAuth.id, session);
    await session.commitTransaction();
    await session.endSession();

    cookieStore.delete(AUTH_SESS_ID_NAME);
    return logger.appSuccessfully('Logged out successfully!');
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    return logger.appError(e.message);
  }
};

export const signOutController = {
  signOut
};