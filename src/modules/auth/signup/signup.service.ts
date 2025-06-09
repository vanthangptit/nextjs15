import { mongo } from 'mongoose';
import { passwordHash } from '@/utils/helpers';
import { ISignupRequest } from '@/modules/auth/signup/signup.entities';
import { UserService } from '@/modules/user/user.service';

export class SignupService {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async signUp(user: ISignupRequest, session: mongo.ClientSession): Promise<void> {
    const { firstName, lastName, email, password } = user;
    await this.userService._createUser(
      {
        alias: email?.toString?.()?.split?.('@')[0],
        firstName,
        lastName,
        email,
        password: password ? passwordHash(password) : undefined
      },
      session
    );
  }
}