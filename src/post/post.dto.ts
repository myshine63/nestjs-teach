import { IsInt, IsString } from 'class-validator';
import { UserInfo } from '../user/user.dto';

export class CreatePost {
  @IsString()
  title: string;
  @IsString()
  text: string;
}

export class FindByPage {
  @IsInt()
  page: number;
  @IsInt()
  size: number;
}

export class PostInfo extends CreatePost {
  id: number;
  createTime: string;
  updateTime: string;
  user: UserInfo;
}
