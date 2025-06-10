import { ResponseData } from '@/utils/types';
import { STATUS_CODE } from '@/utils/constants';
import { RefreshTokenService } from '@/modules/auth/refresh-token/refresh-token.service';
import { appError, appSuccessfully } from '@/utils/helpers';

export class GetTokenController {
  private refreshTokenService: RefreshTokenService;

  constructor() {
    this.refreshTokenService = new RefreshTokenService();
  }

  async getTokenCtrl(refreshToken: string) {
    const response: ResponseData =
      await this.refreshTokenService._handleGetToken(refreshToken);

    if (response.status !== STATUS_CODE.SUCCESS) {
      return appError(response.message, response.status);
    }

    return appSuccessfully(
      'Session got successfully',
      response.data
    );
  }
}
