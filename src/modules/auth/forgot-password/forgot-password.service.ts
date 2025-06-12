import { UserService } from '@/modules/user/user.service';
import { nanoid } from 'nanoid';
import { mongo } from 'mongoose';
import { ForgotPasswordRepository } from '@/modules/auth/forgot-password/forgot-password.repository';
import { ForgotPasswordModel } from '@/modules/auth/forgot-password/forgot-password.model';
import { httpErrorFactory } from '@/libs/http-error/http-error-factory';

export class ForgotPasswordService {
  private readonly userService: UserService;
  private readonly forgotPasswordRepository: ForgotPasswordRepository;
  private readonly emailService?: any;

  constructor() {
    this.userService = new UserService();
    this.forgotPasswordRepository =
      new ForgotPasswordRepository(ForgotPasswordModel);
  }

  async sendMailRestPassword(emailTo: string, code: string) {
    // eslint-disable-next-line no-console
    console.log({ emailTo, code });
    return true;
    // await this.#emailService.sendMailRestPassword(emailTo, code);
  }

  async getTokenForgotPassword(token: string) {
    return this.forgotPasswordRepository.read({ token });
  }

  async forgotPassword(
    email: string,
    session: mongo.ClientSession
  ): Promise<void> {
    const userFound = await this.userService._getUserByEmail(email);
    if (!userFound) {
      throw httpErrorFactory.badRequest('Email does not exist');
    }

    const token = nanoid();

    await this.forgotPasswordRepository.save({
      token,
      user: userFound
    }, session);

    await this.sendMailRestPassword(email, token);
  }
}
