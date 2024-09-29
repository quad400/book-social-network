import { Global, Module } from '@nestjs/common';
import { User, UserSchema } from '../src/user/model/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../src/book/model/book.model';
import {
  History,
  HistorySchema,
} from '../src/history/model/history.model';
import {
  Feedback,
  FeedbackSchema,
} from '../src/book/model/feedback.model';
import { Token, TokenSchema } from '../src/user/model/token.model';
import { Profile, ProfileSchema } from '../src/user/model/profile.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Book.name, schema: BookSchema },
      { name: History.name, schema: HistorySchema },
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
      { name: History.name, schema: HistorySchema },
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
  ],
})
export class Mongoose {}
