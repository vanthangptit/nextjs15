import { ResponseData } from '@/utils/types';

const appError = (message: string, statusCode?: number): ResponseData => {
  return {
    status: statusCode ? statusCode : 500,
    message
  };
};

const appSuccessfully = (message: string, data?: any): ResponseData => {
  return {
    status: 200,
    message,
    data
  };
};

export const logger = {
  appError,
  appSuccessfully
};