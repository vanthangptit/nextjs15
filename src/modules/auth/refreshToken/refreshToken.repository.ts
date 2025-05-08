import { mongo } from 'mongoose';
import { Token } from './refreshToken.model';
import { ICreateTokenParams, ITokenModel } from './refreshToken.interface-typescript';

const getTokenByUserAndRefreshToken = (refreshToken: string, userId: string): Promise<ITokenModel> => {
  const token = Token.findOne({ refreshToken, user: userId });
  return token;
};

const getTokenByUser = (userId: string): Promise<ITokenModel> => {
  const token = Token.findOne({ user: userId });
  return token;
};

const getTokenByRefreshToken = (refreshToken: string): Promise<ITokenModel> => {
  const token = Token.findOne({ refreshToken });
  return token;
};

const createRefreshToken = async (
  params: ICreateTokenParams,
  session: mongo.ClientSession
): Promise<void> => {
  await Token.create([{ ...params }], { session });
};

const deleteRefreshToken = async (
  userId: string,
  session: mongo.ClientSession
): Promise<void> => {
  await Token.deleteMany({ user: userId }).session(session);
};

export const refreshTokenRepository = {
  getTokenByUser,
  createRefreshToken,
  deleteRefreshToken,
  getTokenByRefreshToken,
  getTokenByUserAndRefreshToken
};
