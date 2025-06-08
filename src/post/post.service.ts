import { Injectable } from '@nestjs/common';
import { CreatePost, UpdatePost } from './post.dto';
import { PrismaService } from '../global/prisma.service';

@Injectable()
export default class PostService {
  constructor(private ps: PrismaService) {}

  createPost(post: CreatePost, id: number) {
    return this.ps.post.create({
      data: {
        ...post,
        userId: id,
      },
    });
  }

  findByPage(page: number, size: number, userId: number) {
    return this.ps.post.findMany({
      where: { userId },
      skip: (page - 1) * size,
      take: size,
      orderBy: { updateTime: 'desc' },
    });
  }

  updatePost(post: UpdatePost) {
    return this.ps.post.update({
      where: { id: post.id },
      data: {
        title: post.title,
        text: post.text,
      },
    });
  }
}
