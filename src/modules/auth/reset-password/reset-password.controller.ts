import { startSession } from 'mongoose';
import { IResetPassword } from './reset-password.entities';
import { appError, appSuccessfully } from '@/utils/helpers';
import { ForgotPasswordService } from '@/modules/auth/forgot-password/forgot-password.service';
import { UserService } from '@/modules/user/user.service';
import moment from 'moment';

export class ResetPasswordController {
  // eslint-disable-next-line no-use-before-define
  private static instance: ResetPasswordController;
  private readonly forgotPasswordService: ForgotPasswordService;
  private readonly userService: UserService;

  constructor() {
    this.forgotPasswordService = new ForgotPasswordService();
    this.userService = new UserService();
  }

  public static getInstance(): ResetPasswordController {
    if (!ResetPasswordController.instance) {
      ResetPasswordController.instance = new ResetPasswordController();
    }
    return ResetPasswordController.instance;
  }

  async resetPassword(params: IResetPassword) {
    const session = await startSession();
    session.startTransaction();

    if (params.password !== params.passwordConfirm) {
      return appError('The passwords do not match. Please try again.', 400);
    }

    if (!params.token || !params.token.length) {
      return appError('The request is invalid.', 400);
    }

    try {
      const userFound = await this.userService._getUserByEmail(params.email);
      if (!userFound) {
        return appError('The email not found', 400);
      }
      const tokenFound =
        await this.forgotPasswordService.getTokenForgotPassword(params.token);
      if (!tokenFound) {
        return appError('The token not found', 400);
      }

      const dateValidate = moment(tokenFound?.createdAt);
      const now = moment(new Date());
      // The token expires after 60 minutes.
      if (dateValidate.diff(now, 'hours') > 1) {
        return appError('The token is expired', 400);
      }

      await this.userService._updateUser({
        id: userFound.id,
        password: params.password
      }, session);

      return appSuccessfully('Password changed.');
    } catch (e: any) {
      await session.abortTransaction();
      await session.endSession();
      return appError(e.message);
    }
  }
}

const resetPasswordController = ResetPasswordController.getInstance();
export default resetPasswordController;