import { Controller, Get, Request } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/me')
  getUser(@Request() req): Promise<User> {
    return this.userService.findSnsId(req.user.id, 'kakao');
  }
}
