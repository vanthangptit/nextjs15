import { startSession } from 'mongoose';
import { IFContextSignOut } from '@/utils/types';
import { cookies } from 'next/headers';
import { AUTH_SESS_ID_NAME } from '@/constants/auth';
import { appError, appSuccessfully } from '@/utils/helpers';
import { RefreshTokenService } from '@/modules/auth/refresh-token/refresh-token.service';

export class SignOutController {
  // eslint-disable-next-line no-use-before-define
  private static instance: SignOutController;
  private readonly refreshTokenService: RefreshTokenService;

  constructor() {
    this.refreshTokenService = new RefreshTokenService();
  }

  public static getInstance(): SignOutController {
    if (!SignOutController.instance) {
      SignOutController.instance = new SignOutController();
    }
    return SignOutController.instance;
  }

  async signOut(context: IFContextSignOut) {
    const cookieStore = await cookies();
    const session = await startSession();
    session.startTransaction();

    const { userAuth } = context;
    try {
      const refreshToken = cookieStore.get(AUTH_SESS_ID_NAME)?.value;
      if (!refreshToken) {
        return appError('User not found', 404);
      }
      const userTokenFound = await this.refreshTokenService._getToken({
        user: userAuth.id,
        refreshToken
      });
      if (!userTokenFound) {
        return appError('User not found', 404);
      }
      await this.refreshTokenService._deleteRefreshToken(userAuth.id, session);
      await session.commitTransaction();
      await session.endSession();

      cookieStore.delete(AUTH_SESS_ID_NAME);
      return appSuccessfully('Logged out successfully!');
    } catch (e: any) {
      await session.abortTransaction();
      await session.endSession();
      return appError(e.message);
    }
  }
}


const signOutController = SignOutController.getInstance();
export default signOutController;