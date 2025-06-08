import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import PostService from './post.service';
import AuthGuard from '../guard/auth.guard';
import { CreatePost, FindByPage } from './post.dto';
import { User } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  createPost(@Body() post: CreatePost, @Req() req: Request) {
    const user = req['user'] as User;
    return this.postService.createPost(post, user.id);
  }

  @Post('list')
  findByPage(@Body() data: FindByPage, @Req() req: Request) {
    const user = req['user'] as User;
    return this.postService.findByPage(data.page, data.size, user.id);
  }
}
