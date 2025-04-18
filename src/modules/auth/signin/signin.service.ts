import { ISignInRequest } from './signup.interface';
import userRepository from '@/modules/user/user.repository';
import refreshTokenRepository from '@/modules/auth/refreshToken/refreshToken.repository';
import { logger } from '@/modules/logging';
import { comparePassword, generateTokens } from '@/utils/helpers';
import { mongo } from 'mongoose';
import { cookies, headers } from 'next/headers';
import { AUTH_SESS_ID_NAME } from '@/constants/auth';

const validateRequestSignIn = async (user: ISignInRequest) => {
  try {
    const userFound = await userRepository.getUserByEmail(user.email);
    if (!userFound) {
      return logger.appError('Email not found', 400);
    }
    const isPasswordMatched =
      await comparePassword(user.password, userFound?.password ?? '');
    if (!isPasswordMatched) {
      return logger.appError('Email or password invalid', 400);
    }

    return logger.appSuccessfully('Data is valid!', {
      userFound
    });
  } catch (error: any) {
    return logger.appError(error?.message);
  }
};

const getTokenSignIn = async (
  userId: string,
  session: mongo.ClientSession
) => {
  const cookieStore = await cookies();
  const headerStore = await headers();
  try {
    const {
      accessToken,
      refreshToken: newRefreshToken
    } = generateTokens(userId);

    const userTokenFound =
      await refreshTokenRepository.getTokenByUser(userId);

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
        const foundToken = await refreshTokenRepository.getTokenByRefreshToken(refreshToken);
        // Detected refresh token reuse!
        if (!foundToken) {
          newRefreshTokenArray = []; // clear out ALL previous refresh tokens
        }
        cookieStore.delete(AUTH_SESS_ID_NAME);
      }
      userTokenFound.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await userTokenFound.save();
    } else {
      await refreshTokenRepository.createRefreshToken({
        user: userId,
        refreshToken: [newRefreshToken],
        userAgent: headerStore.get('user-agent') || '',
        ip: headerStore.get('x-forwarded-for') || ''
      }, session);
    }

    return logger.appSuccessfully('Get token successfully!', {
      newRefreshToken,
      accessToken
    });
  } catch (error:any) {
    return logger.appError(error?.message);
  }
};

export const signInService = {
  validateRequestSignIn,
  getTokenSignIn
};
