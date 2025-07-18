import { UserService } from '@/modules/user/user.service';
import { customAlphabet } from 'nanoid';
import { mongo } from 'mongoose';
import { ForgotPasswordRepository } from '@/modules/auth/forgot-password/forgot-password.repository';
import { ForgotPasswordModel } from '@/modules/auth/forgot-password/forgot-password.model';
import { httpErrorFactory } from '@/libs/http-error/http-error-factory';
import mailSender, {
  IForgotPasswordEmail,
  MailSender
} from '@/libs/mail-sender/mail';

export class ForgotPasswordService {
  private readonly userService: UserService;
  private readonly forgotPasswordRepository: ForgotPasswordRepository;
  private readonly emailService: MailSender;

  constructor() {
    this.userService = new UserService();
    this.emailService = mailSender;
    this.forgotPasswordRepository =
      new ForgotPasswordRepository(ForgotPasswordModel);
  }

  async sendMailRestPassword(params: IForgotPasswordEmail) {
    await this.emailService.sendForgotPasswordEmail(params);
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

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const token = customAlphabet(alphabet, 10)();

    await this.forgotPasswordRepository.save({
      token,
      user: userFound
    }, session);

    await this.sendMailRestPassword({
      emailTo: email,
      username: userFound ? userFound.firstName + userFound.lastName : 'Uname',
      code: token
    });
  }
}
