import { logger } from '@/modules/logging';
import { ResponseData } from '@/utils/types';
import { STATUS_CODE } from '@/utils/constants';
import { RefreshTokenService } from '@/modules/auth/refreshToken/refresh-token.service';

export class GetTokenController {
  private refreshTokenService: RefreshTokenService;

  constructor() {
    this.refreshTokenService = new RefreshTokenService();
  }

  async getTokenCtrl(refreshToken: string) {
    const response: ResponseData =
      await this.refreshTokenService.handleGetToken(refreshToken);

    if (response.status !== STATUS_CODE.SUCCESS) {
      return logger.appError(response.message, response.status);
    }

    return logger.appSuccessfully(
      'Session got successfully',
      response.data
    );
  }
}
