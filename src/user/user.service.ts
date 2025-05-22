import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUser } from './user.dto';
import { PrismaService } from '../global/prisma.service';

@Injectable()
export default class UserService {
  constructor(private ps: PrismaService) {}

  async createUser(createUser: CreateUser) {
    const user = await this.ps.user.findUnique({
      where: {
        username: createUser.username,
      },
    });
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'username is exit',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.ps.user.create({
        data: createUser,
      });
    }
  }

  async findOne(id: number) {
    const user = await this.ps.user.findUnique({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'username is not exist',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
