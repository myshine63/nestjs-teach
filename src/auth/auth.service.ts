import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthInfo, CreateUser } from '../user/user.dto';
import { PrismaService } from '../global/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private ps: PrismaService,
    private jwt: JwtService,
  ) {}

  async signIn(user: CreateUser): Promise<AuthInfo> {
    const data = await this.ps.user.findUnique({
      where: { username: user.username },
    });
    if (!data) {
      throw new BadRequestException({
        message: 'username is not exist',
      });
    }
    if (data.password !== user.password) {
      throw new BadRequestException({
        message: 'password is error',
      });
    }
    const token = await this.jwt.signAsync(data);
    return {
      ...data,
      token,
    };
  }
}
