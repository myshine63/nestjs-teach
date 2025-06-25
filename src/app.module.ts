import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import UserModule from './user/user.module';
import { GlobalModule } from './global/global.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import MyLogger from './middlewares/logger';
import UploadController from './upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  controllers: [UploadController],
  imports: [
    UserModule,
    GlobalModule,
    AuthModule,
    PostModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyLogger).forRoutes('user');
  }
}
