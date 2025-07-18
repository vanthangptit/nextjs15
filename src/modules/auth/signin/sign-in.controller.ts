import { startSession } from 'mongoose';
import { ISignInRequest } from './sign-in.entities';
import { SignInService } from './sign-in.service';
import { STATUS_CODE } from '@/utils/constants';
import { appError, appSuccessfully } from '@/utils/helpers';

export class SignInController {
  // eslint-disable-next-line no-use-before-define
  private static instance: SignInController;
  private signInService: SignInService;

  constructor() {
    this.signInService = new SignInService();
  }

  public static getInstance(): SignInController {
    if (!SignInController.instance) {
      SignInController.instance = new SignInController();
    }
    return SignInController.instance;
  }

  async signIn(user: ISignInRequest) {
    const session = await startSession();
    session.startTransaction();

    try {
      const { status, message, data } =
        await this.signInService.validateRequestSignIn(user);
      if (status !== STATUS_CODE.SUCCESS) {
        return appError(message, status);
      }

      const {
        status: statusToken,
        message: messageToken,
        data: dataToken
      } =
        await this.signInService.getTokenSignIn(data.userFound.id, session);
      if (statusToken !== STATUS_CODE.SUCCESS) {
        return appError(messageToken, statusToken);
      }

      await session.commitTransaction();
      await session.endSession();

      return appSuccessfully('Sign in successfully!', {
        ...dataToken
      });
    } catch (e: any) {
      await session.abortTransaction();
      await session.endSession();
      return appError(e.message);
    }
  }
}

const signInController = SignInController.getInstance();
export default signInController;