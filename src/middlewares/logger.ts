import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export default class MyLogger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    console.log(req.baseUrl, req.body);
    next();
  }
}
