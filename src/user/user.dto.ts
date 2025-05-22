import { IsInt, Length } from 'class-validator';

export class CreateUser {
  @Length(6, 20)
  username: string;

  @Length(6, 20)
  password: string;
}

export class UserInfo extends CreateUser {
  @IsInt()
  id: number;
}

export class AuthInfo extends UserInfo {
  token: string;
}
