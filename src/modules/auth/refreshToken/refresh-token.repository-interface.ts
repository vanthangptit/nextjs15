import { mongo } from 'mongoose';
import {
  IRefreshToken,
  IRefreshTokenParams
} from '@/modules/auth/refreshToken/refresh-token.entities';

export interface RefreshTokenRepositoryInterface {
  getToken(_refreshToken: string): Promise<IRefreshToken | null>;
  getTokenByUserId(_userId: string): Promise<IRefreshToken | null>;
  getTokenByUserAndRefreshToken(_refreshToken: string, _userId: string): Promise<IRefreshToken | null>;
  createToken(_params: IRefreshTokenParams, _session: mongo.ClientSession): Promise<IRefreshToken[]>;
  deleteToken(_userId: string, _session: mongo.ClientSession): Promise<void>;
}
