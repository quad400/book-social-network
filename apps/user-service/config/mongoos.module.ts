import { Global, Module } from '@nestjs/common';
import { User, UserSchema } from '../src/user/model/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../src/book/model/book.model';
import {
  BookHistory,
  BookHistorySchema,
} from '../src/book/model/book-history.model';
import {
  BookFeedback,
  BookFeedbackSchema,
} from '../src/book/model/book-review.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
      { name: BookHistory.name, schema: BookHistorySchema },
      { name: BookFeedback.name, schema: BookFeedbackSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
      { name: BookHistory.name, schema: BookHistorySchema },
      { name: BookFeedback.name, schema: BookFeedbackSchema },
    ]),
  ],
})
export class Mongoose {}
