import { mongo } from 'mongoose';
import {
  IRefreshToken,
  IRefreshTokenParams
} from '@/modules/auth/refreshToken/refresh-token.entities';
import {
  IRefreshTokenRepository
} from '@/modules/auth/refreshToken/refresh-token.repository-interface';
import { BaseRepository } from '@/modules/repository';

export class RefreshTokenRepository extends BaseRepository<IRefreshToken> implements IRefreshTokenRepository {
  async find(item: IRefreshToken): Promise<IRefreshToken[]> {
    return this.database.find({ filter: { ...item } });
  }

  async getToken(params: any): Promise<IRefreshToken | null> {
    return this.database.findOne(params);
  }

  async getTokenByUserId(user: string): Promise<IRefreshToken | null> {
    return this.database.findOne({ user });
  }

  async getTokenByUserAndRefreshToken(refreshToken: string, user: string): Promise<IRefreshToken | null> {
    return this.database.findOne({ refreshToken, user });
  }

  async createToken(params: IRefreshTokenParams, session: mongo.ClientSession) {
    return this.database.create([{ ...params }], { session });
  }

  async deleteToken(userId: string, session: mongo.ClientSession) {
    this.database.deleteMany({ user: userId }).session(session);
  }
}