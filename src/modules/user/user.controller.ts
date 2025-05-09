import { UserService } from '@/modules/user/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
}
