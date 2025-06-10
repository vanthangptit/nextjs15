import { ISignInRequest } from './sign-in.entities';
import {
  appError,
  appSuccessfully,
  comparePassword,
  generateTokens
} from '@/utils/helpers';
import { mongo } from 'mongoose';
import { cookies, headers } from 'next/headers';
import { AUTH_SESS_ID_NAME } from '@/constants/auth';
import { RefreshTokenService } from '@/modules/auth/refreshToken/refresh-token.service';
import { UserService } from '@/modules/user/user.service';

export class SignInService {
  private readonly refreshTokenService: RefreshTokenService;
  private readonly userService: UserService;

  constructor() {
    this.refreshTokenService = new RefreshTokenService();
    this.userService = new UserService();
  }

  async validateRequestSignIn(user: ISignInRequest) {
    try {
      const userFound = await this.userService._getUserByEmail(user.email);
      if (!userFound) {
        return appError('Email not found', 400);
      }
      const isPasswordMatched =
        await comparePassword(user.password, userFound?.password ?? '');
      if (!isPasswordMatched) {
        return appError('Email or password invalid', 400);
      }

      return appSuccessfully('Data is valid!', {
        userFound
      });
    } catch (error: any) {
      return appError(error?.message);
    }
  }

  async getTokenSignIn(userId: string, session: mongo.ClientSession) {
    const cookieStore = await cookies();
    const headerStore = await headers();
    try {
      const {
        accessToken,
        refreshToken: newRefreshToken
      } = generateTokens(userId);

      const userTokenFound =
        await this.refreshTokenService._getToken({ user: userId });

      // User was login so user have session ID
      if (userTokenFound) {
        const refreshToken = cookieStore.get(AUTH_SESS_ID_NAME)?.value;

        //Filtering the old token, add the new token
        let newRefreshTokenArray = !refreshToken
          ? userTokenFound.refreshToken
          : userTokenFound.refreshToken.filter(rt => rt !== refreshToken);
        if (refreshToken) {
          /*
            Scenario added here:
              1) User logs in but never uses RT and does not log out
              2) RT is stolen
              3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
          */
          const foundToken =
            await this.refreshTokenService._getToken({ refreshToken });
          // Detected refresh token reuse!
          if (!foundToken) {
            newRefreshTokenArray = []; // clear out ALL previous refresh tokens
          }
          cookieStore.delete(AUTH_SESS_ID_NAME);
        }
        userTokenFound.refreshToken = [
          ...newRefreshTokenArray,
          newRefreshToken
        ];
        await userTokenFound.save();
      } else {
        await this.refreshTokenService._createToken({
          user: userId,
          refreshToken: [newRefreshToken],
          userAgent: headerStore.get('user-agent') || '',
          ip: headerStore.get('x-forwarded-for') || ''
        }, session);
      }

      return appSuccessfully('Get token successfully!', {
        newRefreshToken,
        accessToken
      });
    } catch (error:any) {
      return appError(error?.message);
    }
  }
}
