import { mongo } from 'mongoose';
import { Token } from './refreshToken.model';
import { ICreateTokenParams, ITokenModel } from './refreshToken.interface';

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
  session: any
): Promise<void> => {
  await Token.deleteMany({ user: userId }).session(session);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTokenByUser,
  createRefreshToken,
  deleteRefreshToken,
  getTokenByRefreshToken
};
