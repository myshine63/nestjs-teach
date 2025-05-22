import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import UserModule from './user/user.module';
import { GlobalModule } from './global/global.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import MyLogger from './middlewares/logger';

@Module({
  imports: [UserModule, GlobalModule, AuthModule, PostModule],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyLogger).forRoutes('user');
  }
}
