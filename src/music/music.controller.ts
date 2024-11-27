import { Controller, Post, Get, Delete, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { MusicService } from './music.service';
import { multerConfig, getFileNames } from '../config/multer.config';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }], multerConfig))
  async uploadMusic(@UploadedFiles() files, @Body() body) {
    const { imageFileName, audioFileName } = getFileNames(files);
    return this.musicService.uploadMusic(body, imageFileName, audioFileName);
  }

  @Get()
  async getMusics() {
    return this.musicService.getMusics();
  }

  @Get(':userId')
  async getMusicsByActor(@Param('userId') userId: string) {
    return this.musicService.getMusicsByActor(userId);
  }

  @Delete('delete')
  async deleteMusic(@Body() body) {
    return this.musicService.deleteMusic(body);
  }
}