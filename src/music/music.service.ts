import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music, MusicDocument } from './schemas/music.schema';
import * as mm from 'music-metadata';

@Injectable()
export class MusicService {
  constructor(@InjectModel(Music.name) private musicModel: Model<MusicDocument>) {}

  async uploadMusic(body, imageFileName, audioFileName) {
    const { name, userId } = body;

    const metadata = await mm.parseFile(`./uploads/audios/${audioFileName}`);
    const duration = metadata.format.duration;
    const formatDuration = `${Math.floor(duration / 60)}:${Math.floor(duration % 60) < 10 ? '0' : ''}${Math.floor(duration % 60)}`;

    if (!imageFileName || !audioFileName) {
      return { message: 'Должны быть загружены и картинка, и аудио' };
    }

    const imageUrl = `/uploads/images/${imageFileName}`;
    const audioUrl = `/uploads/audios/${audioFileName}`;

    const musicDoc = new this.musicModel({
      name,
      userId,
      imageUrl,
      audioUrl,
      duration: formatDuration,
    });

    await musicDoc.save();
    return { message: 'Трек успешно добавлен!', music: musicDoc };
  }

  async getMusics() {
    return this.musicModel.find().populate('userId');
  }

  async getMusicsByActor(userId: string) {
    return this.musicModel.find({ userId });
  }

  async deleteMusic(body) {
    const music = await this.musicModel.findByIdAndDelete(body.musicId);
    if (!music) {
      return { message: 'Трек не найден' };
    }
    return { message: 'Трек успешно удален!', musicId: body.musicId };
  }
}