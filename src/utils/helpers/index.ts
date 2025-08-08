import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '@/configs';
import cloneDeep from 'clone-deep';
import { AUTH_SESS_ID_NAME, DELAY_TIMEOUT_API } from '@/utils/constants';
import { ObjectSchema } from 'yup';
import { NextRequest } from 'next/server';
import { serialize } from 'cookie';
import {
  IFPayloadToken,
  IFResponseValidate,
  ResponseData,
  SessionKeys
} from '@/utils/types';
import { logger } from '@/libs/logger';
import moment from 'moment';

export const passwordHash = (password: string) => {
  const saltRounds = parseInt(config.PRIVATE_LENGTH_HASH_SALT || '');
  const salt = bcrypt.genSaltSync(saltRounds);

  return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (
  passwordReq: string,
  password: string
) => {
  return bcrypt.compareSync(passwordReq, password);
};

export const generateTokens = (id: string) => {
  const payload: IFPayloadToken = { id };
  const accessToken = jwt.sign(
    payload,
    config.PRIVATE_ACCESS_TOKEN_SECRET_KEY || '',
    { expiresIn: '1m' }
  );
  const refreshToken = jwt.sign(
    payload,
    config.PRIVATE_REFRESH_TOKEN_PRIVATE_KEY || '',
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
    logger.error('Error::Verify token failed - ' + e);
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
    return new Promise(
      resolve => setTimeout(() => resolve(x), DELAY_TIMEOUT_API)
    );
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

export const appError = (message: string, status?: number): ResponseData => {
  return {
    status: status ? status : 500,
    message
  };
};

export const appSuccessfully = (message: string, data?: any): ResponseData => {
  return {
    status: 200,
    message,
    data
  };
};

export const appResponse = (data: ResponseData, header?: HeadersInit) => {
  let status = data?.status ? data.status : 500;
  let message: string = data.message;
  const isEnvProduction = process.env.NODE_ENV === 'production';

  switch (status) {
    case 500: {
      message = 'Internal Server Error';
      break;
    }
    case 401:
    case 403:
    case 404: {
      status = isEnvProduction ? 400 : status;
      message = isEnvProduction ? '400 Not bad.' : message;
      break;
    }
  }

  const retData: ResponseData = {
    message,
    status
  };

  if (data) {
    retData['data'] = data.data;
  }

  return new Response(JSON.stringify(retData), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...header
    }
  });
};

export const areDatesWithinMinutes = (
  d1: moment.Moment,
  d2: moment.Moment,
  minutes: number
) => {
  return Math.abs(d1.diff(d2, 'minutes')) < minutes;
};
