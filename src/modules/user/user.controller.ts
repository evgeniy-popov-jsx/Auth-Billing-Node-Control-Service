import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Проверка, занят ли username
   * GET /user/check-username?username=...
   */
  @Get('check-username')
  async checkUsername(@Query('username') username: string): Promise<boolean> {
    return await this.userService.isUsernameAvailable(username);
  }

  /**
   * Проверка, занята ли email
   * GET /user/check-email?email=...
   */
  @Get('check-email')
  async checkEmail(@Query('email') email: string): Promise<boolean> {
    return await this.userService.isEmailAvailable(email);
  }
}
