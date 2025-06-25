import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('upload')
export default class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // 上传目录
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 20 * 1024 * 1024, // 最大 5MB
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Upload success',
      filename: file.filename,
      path: `http://localhost:3005/${file.filename}`,
    };
  }

  // 获取图片列表接口
  @Get('list')
  getImageList(@Req() req: Request) {
    const uploadDir = join(__dirname, '..', '..', 'uploads');
    console.log(req.url);
    const host = 'http://localhost:3005';
    const files = readdirSync(uploadDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file),
    );

    const imageUrls = imageFiles.map((file) => ({
      filename: file,
      url: `${host}/${file}`,
    }));

    return {
      message: 'Image list fetched successfully',
      images: imageUrls,
    };
  }
}
