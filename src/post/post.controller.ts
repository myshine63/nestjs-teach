import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import PostService from './post.service';
import AuthGuard from '../guard/auth.guard';
import { CreatePost, FindByPage, SearchPost, UpdatePost } from './post.dto';
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

  @Post('update')
  updatePost(@Body() post: UpdatePost) {
    return this.postService.updatePost(post);
  }

  @Delete('delete/:id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(Number(id));
  }

  @Post('list/time')
  findPostsByTime(@Body() data: SearchPost) {
    return this.postService.listPostsByTime(data);
  }
}
