import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as multer from 'multer';
import * as dotenv from 'dotenv';
import { multerConfig } from './config/multer.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(cors());

  app.use(multer(multerConfig).any());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
