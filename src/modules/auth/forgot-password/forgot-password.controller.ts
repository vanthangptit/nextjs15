import { startSession } from 'mongoose';
import { ForgotPasswordService } from '@/modules/auth/forgot-password/forgot-password.service';
import { IFForgotPasswordRequest } from '@/modules/auth/forgot-password/forgot-password.entities';
import { appError, appSuccessfully } from '@/utils/helpers';

export class ForgotPasswordController {
  // eslint-disable-next-line no-use-before-define
  private static instance: ForgotPasswordController;
  private forgotPasswordService: ForgotPasswordService;

  constructor() {
    this.forgotPasswordService = new ForgotPasswordService();
  }

  public static getInstance(): ForgotPasswordController {
    if (!ForgotPasswordController.instance) {
      ForgotPasswordController.instance = new ForgotPasswordController();
    }
    return ForgotPasswordController.instance;
  }

  async forgotPassword ({ email }: IFForgotPasswordRequest) {
    const session = await startSession();
    session.startTransaction();

    try {
      await this.forgotPasswordService.forgotPassword(email, session);

      await session.commitTransaction();
      await session.endSession();
      return appSuccessfully('Requested successfully');
    } catch (e: any) {
      await session.abortTransaction();
      await session.endSession();
      return appError(e?.message);
    }
  };
}

const forgotPasswordController = ForgotPasswordController.getInstance();
export default forgotPasswordController;