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
  const status = data?.status ? data.status : 500;
  let message: string = data.message;

  if (status === 500) {
    message = 'Internal Server Error';
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