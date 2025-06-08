import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUser } from './user.dto';
import UserService from './user.service';
import AuthGuard from '../guard/auth.guard';
import { User } from '@prisma/client';

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

  @UseGuards(AuthGuard)
  @Get()
  getUser(@Req() req: Request) {
    const user = req['user'] as User;
    return this.userService.findOne(user.id);
  }
}
