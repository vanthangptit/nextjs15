import { UserService } from '@/modules/user/user.service';

class UserController {
  // eslint-disable-next-line no-use-before-define
  private static instance: UserController;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }
}

const userController = UserController.getInstance();
export default userController;
