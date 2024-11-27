import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(body) {
    const { nickname, email, password } = body;
    const userDoc = new this.userModel({ nickname, email, password });
    await userDoc.save();
    return { message: 'Артист успешно создан!', user: userDoc };
  }

  async login(body) {
    const user = await this.userModel.findOne({ email: body.email });
    if (!user || user.password !== body.password) {
      return { message: 'Неправильный логин или пароль' };
    }
    return user;
  }

  async addFavorite(body) {
    const user = await this.userModel.findById(body.userId);
    if (!user) {
      return { message: 'Музыкант не найден' };
    }
    user.favoritesMusics.push(body.musicId);
    await user.save();
    return { message: 'Трек успешно добавлен в избранные!' };
  }

  async removeFavorite(body) {
    const user = await this.userModel.findById(body.userId);
    if (!user) {
      return { message: 'Музыкант не найден' };
    }
    user.favoritesMusics = user.favoritesMusics.filter(id => id.toString() !== body.musicId);
    await user.save();
    return { message: 'Трек успешно удален из избранных!' };
  }

  async changeAvatar(body, imageFileName) {
    const user = await this.userModel.findById(body.userId);
    if (!user) {
      return { message: 'Музыкант не найден' };
    }
    const imageUrl = `/uploads/images/${imageFileName}`;
    user.avatar = imageUrl;
    await user.save();
    return { message: 'Аватарка успешно изменена!', newpath: imageUrl };
  }

  async changeNickname(body) {
    const user = await this.userModel.findById(body.userId);
    if (!user) {
      return { message: 'Музыкант не найден' };
    }
    user.nickname = body.newnickname;
    await user.save();
    return { message: 'Ник успешно изменен' };
  }

  async changePassword(body) {
    const user = await this.userModel.findById(body.userId);
    if (!user) {
      return { message: 'Музыкант не найден' };
    }
    user.password = body.newpassword;
    await user.save();
    return { message: 'Пароль успешно изменен' };
  }
}