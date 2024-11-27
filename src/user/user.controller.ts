import { Controller, Post, Body, UseInterceptors, UploadedFiles, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { multerConfig, getFileNames } from '../config/multer.config';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body) {
    return this.userService.register(body);
  }

  @Post('login')
  async login(@Body() body) {
    return this.userService.login(body);
  }

  @Patch('addfavorites')
  async addFavorite(@Body() body) {
    return this.userService.addFavorite(body);
  }

  @Delete('removefavorites')
  async removeFavorite(@Body() body) {
    return this.userService.removeFavorite(body);
  }

  @Patch('changeavatar')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], multerConfig))
  async changeAvatar(@UploadedFiles() files, @Body() body) {
    const { imageFileName } = getFileNames(files);
    return this.userService.changeAvatar(body, imageFileName);
  }

  @Patch('changenickname')
  async changeNickname(@Body() body) {
    return this.userService.changeNickname(body);
  }

  @Patch('changepassword')
  async changePassword(@Body() body) {
    return this.userService.changePassword(body);
  }
}