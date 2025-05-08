import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '@/configs';
import cloneDeep from 'clone-deep';
import { AUTH_SESS_ID_NAME, DELAY_TIMEOUT_API } from '@/utils/constants';
import { ObjectSchema } from 'yup';
import { NextRequest } from 'next/server';
import { serialize } from 'cookie';
import { IFPayloadToken, IFResponseValidate, SessionKeys } from '@/utils/types';

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

export const sleeper = () => {
  return function(x: any) {
    return new Promise(resolve => setTimeout(() => resolve(x), DELAY_TIMEOUT_API));
  };
};

export const validation = async (
  scheme: ObjectSchema<any>,
  dataRequest: any
): Promise<IFResponseValidate> => {
  try {
    await scheme.validate(dataRequest, { abortEarly: false });
    return { isValid: true, errors: null };
  } catch (error: any) {
    return {
      isValid: false,
      errors: {
        message: error.errors[0]
      }
    };
  }
};

export const getTokenFromHeader = (req: NextRequest) => {
  const token = req.headers.get('authorization')?.toString().split(' ')[1];
  if (!token) {
    return null;
  }
  return token;
};

export const setCookie = (token: string): string => {
  return serialize(AUTH_SESS_ID_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/'
  });
};

export const getSessionStorage = (sessionKey: SessionKeys) => {
  return sessionStorage.getItem(sessionKey);
};

export const setSessionStorage = (sessionKey: SessionKeys, value: any) => {
  return sessionStorage.setItem(sessionKey, value);
};

export const removeSessionStorage = (sessionKey: SessionKeys) => {
  return sessionStorage.removeItem(sessionKey);
};

export const clearSessionStorage = () => {
  return sessionStorage.clear();
};
