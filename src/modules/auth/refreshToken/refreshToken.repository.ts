import { mongo } from 'mongoose';
import { Token } from './refreshToken.model';
import { ICreateTokenParams, ITokenModel } from './refreshToken.interface';

const getTokenByUser = (userId: string): Promise<ITokenModel> => {
  return Token.findOne({ user: userId });
}

const getTokenByRefreshToken = (refreshToken: string): Promise<ITokenModel> => {
  return Token.findOne({ refreshToken });
}

const createRefreshToken = async (
  params: ICreateTokenParams,
  session: mongo.ClientSession
): Promise<ITokenModel> => {
  await Token.create([{...params}], { session });
};

const deleteRefreshToken = async (
  userId: string,
  session: any
): Promise<void> => {
  await Token.deleteMany({ user: userId }).session(session);
};

export default {
  getTokenByUser,
  createRefreshToken,
  deleteRefreshToken,
  getTokenByRefreshToken,
}
