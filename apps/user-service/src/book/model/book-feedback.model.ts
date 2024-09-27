import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/model/user.model';
import { Book } from './book.model';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false, timestamps: true })
export class BookFeedback extends AbstractDocument{
  @Prop({ type: User, required: true })
  user: User;

  @Prop({ type: Book, required: true })
  book: Book;

  @Prop({ type: Number, max: 5, min: 1 })
  rating: number;

  @Prop({ type: String, maxlength: 225 })
  comment: string;
}

export const BookFeedbackSchema = SchemaFactory.createForClass(BookFeedback);
