import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../user/model/user.model';
import { Book } from './book.model';

@Schema({ versionKey: false, timestamps: true })
export class BookHistory {
  @Prop({ type: User, required: true })
  borrower: User;

  @Prop({ type: Book, required: true })
  book_cover: Book;

  @Prop({ type: Boolean, default: false })
  retured: boolean;

  @Prop({ type: Boolean, default: false })
  return_approved: boolean;
}

export const BookHistorySchema = SchemaFactory.createForClass(BookHistory);
