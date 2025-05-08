import { IRefreshToken } from '@/modules/auth/refreshToken/refresh-token.entities';
import { RefreshTokenRepositoryInterface } from '@/modules/auth/refreshToken/refresh-token.repository-interface';
import { BaseRepository } from '@/modules/repository';
import { ICreateTokenParams } from '@/modules/auth/refreshToken/refreshToken.interface-typescript';
import { mongo } from 'mongoose';

export class RefreshTokenRepository extends BaseRepository<IRefreshToken> implements RefreshTokenRepositoryInterface {
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

  async createToken(params: ICreateTokenParams, session: mongo.ClientSession) {
    return this.database.create([{ ...params }], { session });
  }

  async deleteToken() {}
}