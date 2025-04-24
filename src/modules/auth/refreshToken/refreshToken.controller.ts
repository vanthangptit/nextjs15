import { logger } from '@/modules/logging';
import { refreshTokenService } from '@/modules/auth/refreshToken/refreshToken.service';
import { ResponseData } from '@/utils/types';
import { STATUS_CODE } from '@/utils/constants';

const getTokenCtrl = async (refreshToken: string) => {
  const response: ResponseData =
    await refreshTokenService.handleGetToken(refreshToken);

  if (response.status !== STATUS_CODE.SUCCESS) {
    return logger.appError(response.message, response.status);
  }

  return logger.appSuccessfully(
    'Session got successfully',
    response.data
  );
};

export const getTokenController = {
  getTokenCtrl
};