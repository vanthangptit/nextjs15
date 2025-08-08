import { startSession } from 'mongoose';
import { ISignupRequest } from './signup.entities';
import { SignupService } from '@/modules/auth/signup/signup.service';
import { UserService } from '@/modules/user/user.service';
import { appError, appSuccessfully } from '@/utils/helpers';

export class SignupController {
  // eslint-disable-next-line no-use-before-define
  private static instance: SignupController;

  private readonly signupService: SignupService;
  private readonly userService: UserService;

  constructor() {
    this.signupService = new SignupService();
    this.userService = new UserService();
  }

  static getInstance() {
    if (!SignupController.instance) {
      SignupController.instance = new SignupController();
    }

    return SignupController.instance;
  }

  async signUp(user: ISignupRequest) {
    const session = await startSession();
    session.startTransaction();

    if (user.passwordConfirm !== user.password) {
      return appError('Password not matched', 400);
    }

    try {
      const userFound = await this.userService._checkUserExists(user.email);
      if (userFound) {
        return appError('Email already exists', 400);
      }

      await this.signupService.signUp(user, session);

      /** @todo: Add send mail
       *  @todo google cloud (Oauth2 - blog-website)
       *  https://console.cloud.google.com/apis/credentials?project=blog-website-404616&supportedpurview=project
       **/

      await session.commitTransaction();
      await session.endSession();

      return appSuccessfully('User created successfully');
    } catch (e: any) {
      await session.abortTransaction();
      await session.endSession();
      return appError(e?.message);
    }
  }
}

const signupController = SignupController.getInstance();
export default signupController;