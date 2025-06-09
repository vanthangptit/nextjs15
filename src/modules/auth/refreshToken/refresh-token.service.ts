import { AnyKeys, mongo, RootFilterQuery } from 'mongoose';
import { RefreshTokenRepository } from '@/modules/auth/refreshToken/refresh-token.repository';
import { Token } from '@/modules/auth/refreshToken/refresh-token.model';
import { IFPayloadToken } from '@/utils/types';
import { appError, appSuccessfully, generateTokens, verifyToken } from '@/utils/helpers';
import { config } from '@/configs';
import {
  IRefreshToken
} from '@/modules/auth/refreshToken/refresh-token.entities';

export class RefreshTokenService {
  private readonly refreshTokenRepository: RefreshTokenRepository;

  constructor() {
    this.refreshTokenRepository = new RefreshTokenRepository(Token);
  }

  async #handleTokenInvalid(decoded: IFPayloadToken) {
    try {
      // Delete refresh tokens of hacked user
      const foundToken =
        await this.refreshTokenRepository.read({ _id: decoded.id.toString() });

      if (foundToken) {
        foundToken.refreshToken = [];
        await foundToken.save();
      }

      return appError('Unauthorized. Please login again!', 401);
    } catch (e: any) {
      return appError(e?.message);
    }
  }

  async #handleTokenValid(userToken: IRefreshToken, refreshToken: string, decoded: IFPayloadToken) {
    const newRefreshTokenArray = userToken.refreshToken.filter(rt => rt !== refreshToken);

    // If expired token or invalid token
    if (!decoded || decoded.id.toString() !== userToken.user.toString()) {
      userToken.refreshToken = [...newRefreshTokenArray];
      await userToken.save();
      return appError('Access Denied. Invalid token.', 401);
    }

    const {
      accessToken,
      refreshToken: newRefreshToken
    } = generateTokens(userToken.user.toString());

    // Saving refreshToken with current user
    userToken.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await userToken.save();

    return appSuccessfully(
      'User created successfully',
      {
        accessToken,
        refreshToken: newRefreshToken
      }
    );
  }

  async _deleteRefreshToken(userId: string, session: mongo.ClientSession): Promise<void> {
    await this.refreshTokenRepository.delete(userId, session);
  }

  async _getToken(params: RootFilterQuery<IRefreshToken>): Promise<IRefreshToken | null> {
    return this.refreshTokenRepository.read({ ...params });
  }

  async _createToken(params: AnyKeys<IRefreshToken>, session: mongo.ClientSession) {
    return this.refreshTokenRepository.save(params, session);
  }

  async _handleGetToken(refreshToken: string) {
    const decoded: IFPayloadToken | undefined
      = await verifyToken(refreshToken, config.REFRESH_TOKEN_PRIVATE_KEY ?? '');
    if (!decoded) {
      return appError('403 Forbidden', 403);
    }

    try {
      const userTokenFound =
        await this.refreshTokenRepository.read({ refreshToken });

      if (!userTokenFound) {
        return await this.#handleTokenInvalid(decoded);
      }

      return await this.#handleTokenValid(userTokenFound, refreshToken, decoded);
    } catch (e: any) {
      return appError(e?.message);
    }
  }
}