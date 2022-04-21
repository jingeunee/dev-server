import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
