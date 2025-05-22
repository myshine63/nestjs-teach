import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUser } from './user.dto';
import UserService from './user.service';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserInfo(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() user: CreateUser) {
    return this.userService.createUser(user);
  }
}
