import { logger } from '@/modules/logging';
import refreshTokenService from '@/modules/auth/refreshToken/refreshToken.service';
import { ResponseData } from '@/utils/types';

const getTokenCtrl = async (refreshToken: string) => {
  const response: ResponseData =
    await refreshTokenService.handleGetToken(refreshToken);

  if (response.status === 200) {
    return logger.appSuccessfully(
      'User created successfully',
      response.data
    );
  } else {
    return logger.appError(response.message, response.status);
  }
}

export default {
  getTokenCtrl
}