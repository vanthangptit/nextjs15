import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '@/configs';
import {
  IFPayloadToken
} from '@/modules/auth/refreshToken/refreshToken.interface';
import cloneDeep from 'clone-deep';

export const passwordHash = (password: string) => {
  const saltRounds = parseInt(config.LENGTH_HASH_SALT || '');
  const salt = bcrypt.genSaltSync(saltRounds);

  return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (passwordReq: string, password: string) => {
  return bcrypt.compareSync(passwordReq, password);
};

export const generateTokens = (id: string) => {
  const payload: IFPayloadToken = { id };
  const accessToken = jwt.sign(
    payload,
    config.ACCESS_TOKEN_SECRET_KEY || '',
    { expiresIn: '5m' }
  );
  const refreshToken = jwt.sign(
    payload,
    config.REFRESH_TOKEN_PRIVATE_KEY || '',
    { expiresIn: '7d' }
  );

  return {
    accessToken,
    refreshToken
  };
};

export const verifyToken = async (
  token: string,
  tokenSecretKey: string
): Promise<IFPayloadToken | undefined> => {
  try {
    return jwt.verify(token, tokenSecretKey) as IFPayloadToken;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error::Verify token failed - ' + e);
    return undefined;
  }
};

export const cloneDeepData = (data: any): any => {
  if (!data) {
    return data;
  }

  if (data.constructor === Array && !data.length) {
    return [];
  }

  return cloneDeep(data);
};