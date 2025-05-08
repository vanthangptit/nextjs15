import { refreshTokenRepository } from '@/modules/auth/refreshToken/refreshToken.repository';
import { IFPayloadToken } from '@/utils/types';
import { config } from '@/configs';
import { generateTokens, verifyToken } from '@/utils/helpers';
import { logger } from '@/modules/logging';
import { ITokenModel } from '@/modules/auth/refreshToken/refreshToken.interface-typescript';

const handleTokenValid = async (userToken: ITokenModel, refreshToken: string) => {
  const decodedUser: IFPayloadToken | undefined = await verifyToken(
    refreshToken,
    config.REFRESH_TOKEN_PRIVATE_KEY ?? ''
  );

  const newRefreshTokenArray = userToken.refreshToken.filter(rt => rt !== refreshToken);

  // If expired token or invalid token
  if (!decodedUser || decodedUser.id.toString() !== userToken.user.toString()) {
    userToken.refreshToken = [...newRefreshTokenArray];
    await userToken.save();
    return logger.appError('Access Denied. Invalid token.', 401);
  }

  const {
    accessToken,
    refreshToken: newRefreshToken
  } = generateTokens(userToken.user.toString());

  // Saving refreshToken with current user
  userToken.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  await userToken.save();

  return logger.appSuccessfully(
    'User created successfully',
    {
      accessToken,
      refreshToken: newRefreshToken
    }
  );
};

const handleTokenInvalid = async (refreshToken: string) => {
  try {
    const decoded: IFPayloadToken | undefined
      = await verifyToken(refreshToken, config.REFRESH_TOKEN_PRIVATE_KEY ?? '');
    if (!decoded) {
      return logger.appError('403 Forbidden', 403);
    }

    // Delete refresh tokens of hacked user
    const foundToken =
      await refreshTokenRepository.getTokenByUser(decoded.id.toString());

    if (foundToken) {
      foundToken.refreshToken = [];
      await foundToken.save();
    }

    return logger.appError('Unauthorized. Please login again!', 401);
  } catch (e: any) {
    return logger.appError(e?.message);
  }
};

const handleGetToken = async (refreshToken: string) => {
  try {
    const userTokenFound: ITokenModel =
      await refreshTokenRepository.getTokenByRefreshToken(refreshToken);

    if (!userTokenFound) {
      return await handleTokenInvalid(refreshToken);
    }

    return await handleTokenValid(userTokenFound, refreshToken);
  } catch (e: any) {
    return logger.appError(e?.message);
  }
};

export const refreshTokenService = {
  handleGetToken
};