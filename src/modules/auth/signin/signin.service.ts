import { ISignInRequest } from './signup.interface';
import userRepository from '@/modules/user/user.repository';
import refreshTokenRepository from '@/modules/auth/refreshToken/refreshToken.repository';
import { logger } from '@/modules/logging';
import { comparePassword, generateTokens } from '@/utils/helpers';
import { mongo } from 'mongoose';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

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
  session: mongo.ClientSession,
  cookies: ReadonlyRequestCookies
) => {
  let hasClearCookie: boolean = false;
  try {
    const {
      accessToken,
      refreshToken: newRefreshToken
    } = generateTokens(userId);

    const userTokenFound =
      await refreshTokenRepository.getTokenByUser(userId);

    if (userTokenFound) {
      const authToken = cookies.get('authToken');
      let newRefreshTokenArray = !authToken?.value
        ? userTokenFound.refreshToken
        : userTokenFound.refreshToken.filter(rt => rt !== authToken?.value);
      if (authToken?.value) {
        /*
          Scenario added here:
            1) User logs in but never uses RT and does not logout
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */
        const refreshToken = authToken?.value;
        const foundToken = await refreshTokenRepository.getTokenByRefreshToken(refreshToken);
        // Detected refresh token reuse!
        if (!foundToken) {
          newRefreshTokenArray = []; // clear out ALL previous refresh tokens
        }

        hasClearCookie = true;
      }

      userTokenFound.refreshToken = [ ...newRefreshTokenArray, newRefreshToken ];
      await userTokenFound.save();
    } else {
      await refreshTokenRepository.createRefreshToken({
        user: userId,
        refreshToken: [ newRefreshToken ],
        userAgent: 'user', //@todo: double check again
        ip: '19' //@todo: double check again
      }, session);
    }

    return logger.appSuccessfully('Get token successfully!', {
      newRefreshToken,
      accessToken,
      hasClearCookie
    });
  } catch (error:any) {
    return logger.appError(error?.message);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  validateRequestSignIn,
  getTokenSignIn
};
