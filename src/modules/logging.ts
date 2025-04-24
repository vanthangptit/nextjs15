import { ResponseData } from '@/utils/types';

const appError = (message: string, status?: number): ResponseData => {
  return {
    status: status ? status : 500,
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

const appResponse = (data: ResponseData, header?: HeadersInit) => {
  let status = data?.status ? data.status : 500;
  let message: string = data.message;
  const isEnvProduction = process.env.APP_ENV === 'production';

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

export const logger = {
  appError,
  appSuccessfully,
  appResponse
};