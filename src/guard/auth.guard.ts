import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserInfo } from '../user/user.dto';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers.authorization || '';
    try {
      console.log(token);
      const data = await this.jwt
        .verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        })
        .then((data: UserInfo) => {
          console.log(123123123);
          req['user'] = data;
        });
      console.log(data);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }
}
