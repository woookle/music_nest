import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type MusicDocument = Music & Document;

@Schema()
export class Music {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  audioUrl: string;

  @Prop()
  duration: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);