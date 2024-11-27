import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Music } from '../../music/schemas/music.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }] })
  favoritesMusics: Music[];

  @Prop({ default: '/uploads/images/defaultavatar.jpg' })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);