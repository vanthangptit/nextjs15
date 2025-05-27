import { mongo } from 'mongoose';
import { RefreshTokenRepository } from '@/modules/auth/refreshToken/refresh-token.repository';
import { Token } from '@/modules/auth/refreshToken/refresh-token.model';
import { IFPayloadToken } from '@/utils/types';
import { generateTokens, verifyToken } from '@/utils/helpers';
import { config } from '@/configs';
import { logger } from '@/modules/logging';
import {
  IRefreshToken,
  IRefreshTokenParams
} from '@/modules/auth/refreshToken/refresh-token.entities';
import { BaseService } from '@/modules/service';

export class RefreshTokenService extends BaseService {
  private readonly refreshTokenRepository: RefreshTokenRepository;

  constructor() {
    super();
    this.refreshTokenRepository = new RefreshTokenRepository(Token);

    this._makeMethodsFinal({
      _deleteRefreshToken: this._deleteRefreshToken,
      _getUserToken: this._getUserToken,
      _getTokenByUserId: this._getTokenByUserId,
      _getToken: this._getToken,
      _createToken: this._createToken,
      handleGetToken: this.handleGetToken
    });
  }

  async #handleTokenInvalid(decoded: IFPayloadToken) {
    try {
      // Delete refresh tokens of hacked user
      const foundToken =
        await this.refreshTokenRepository.getTokenByUserId(decoded.id.toString());

      if (foundToken) {
        foundToken.refreshToken = [];
        await foundToken.save();
      }

      return logger.appError('Unauthorized. Please login again!', 401);
    } catch (e: any) {
      return logger.appError(e?.message);
    }
  }

  async #handleTokenValid(userToken: IRefreshToken, refreshToken: string, decoded: IFPayloadToken) {
    const newRefreshTokenArray = userToken.refreshToken.filter(rt => rt !== refreshToken);

    // If expired token or invalid token
    if (!decoded || decoded.id.toString() !== userToken.user.toString()) {
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
  }

  async _deleteRefreshToken(userId: string, session: mongo.ClientSession): Promise<void> {
    await this.refreshTokenRepository.deleteToken(userId, session);
  }

  async _getUserToken(user: string, refreshToken: string): Promise<IRefreshToken | null> {
    return this.refreshTokenRepository.getToken({ user, refreshToken });
  }

  async _getTokenByUserId(userId: string): Promise<IRefreshToken | null> {
    return this.refreshTokenRepository.getTokenByUserId(userId);
  }

  async _getToken(refreshToken: string): Promise<IRefreshToken | null> {
    return this.refreshTokenRepository.getToken({ refreshToken });
  }

  async _createToken(params: IRefreshTokenParams, session: mongo.ClientSession) {
    return this.refreshTokenRepository.createToken({ ...params }, session);
  }

  async handleGetToken(refreshToken: string) {
    const decoded: IFPayloadToken | undefined
      = await verifyToken(refreshToken, config.REFRESH_TOKEN_PRIVATE_KEY ?? '');
    if (!decoded) {
      return logger.appError('403 Forbidden', 403);
    }

    try {
      const userTokenFound =
        await this.refreshTokenRepository.getToken({ refreshToken });

      if (!userTokenFound) {
        return await this.#handleTokenInvalid(decoded);
      }

      return await this.#handleTokenValid(userTokenFound, refreshToken, decoded);
    } catch (e: any) {
      return logger.appError(e?.message);
    }
  }
}