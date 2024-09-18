import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/model/user.model';
import { Book } from './book.model';

@Schema({ versionKey: false, timestamps: true })
export class BookFeedback {
  @Prop({ type: User, required: true })
  user: string;

  @Prop({ type: Book, required: true })
  book: string;

  @Prop({ type: Number, max: 5, min: 1 })
  rating: number;

  @Prop({ type: String, maxlength: 225 })
  content: string;
}

export const BookFeedbackSchema = SchemaFactory.createForClass(BookFeedback);
