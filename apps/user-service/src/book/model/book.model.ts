import { BookEnum } from '@app/common/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Book {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  book_cover: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: String })
  synopsis: string;

  @Prop({ type: String })
  isbn: string;

  @Prop({ enum: BookEnum, required: true })
  genre: string;

  @Prop({ type: Boolean, default: true })
  shareable: boolean;

  @Prop({ type: Boolean, default: false })
  achieved: boolean;

  @Prop({ type: [{ type: Types.UUID, ref: 'BookFeedback' }], default: [] })
  book_feedbacks: Types.UUID[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
