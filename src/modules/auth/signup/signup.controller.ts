import { startSession } from 'mongoose';
import { logger } from '@/modules/logging';
import { ISignupRequest } from './signup.entities';
import { SignupService } from '@/modules/auth/signup/signup.service';
import { UserService } from '@/modules/user/user.service';

export class SignupController {
  private readonly signupService: SignupService;
  private readonly userService: UserService;

  constructor() {
    this.signupService = new SignupService();
    this.userService = new UserService();
  }

  async signUp(user: ISignupRequest) {
    const session = await startSession();
    session.startTransaction();

    if (user.passwordConfirm !== user.password) {
      return logger.appError('Password not matched', 400);
    }

    try {
      const userFound = await this.userService.checkUserExists(user.email);
      if (userFound) {
        return logger.appError('Email already exists', 400);
      }

      await this.signupService.signUp(user, session);

      /** @todo: Add send mail
       *  @todo google cloud (Oauth2 - blog-website)
       *  https://console.cloud.google.com/apis/credentials?project=blog-website-404616&supportedpurview=project
       **/

      await session.commitTransaction();
      await session.endSession();

      return logger.appSuccessfully('User created successfully');
    } catch (e: any) {
      await session.abortTransaction();
      await session.endSession();
      return logger.appError(e?.message);
    }
  }
}