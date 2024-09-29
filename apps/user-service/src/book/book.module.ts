import { Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { BookController } from './controller/book.controller';
import { BookRepository } from './respository/book.repository';
import { UserRepository } from '../user/repository/user.repository';
import { HistoryRepository } from '../history/repository/history.repository';
import { FeedbackController } from './controller/feedback.controller';
import { FeedbackService } from './service/feedback.service';
import { FeedbackRepository } from './respository/feedback.repository';

@Module({
  controllers: [BookController, FeedbackController],
  providers: [
    BookService,
    BookRepository,
    UserRepository,
    HistoryRepository,
    FeedbackService,
    FeedbackRepository
  ],
})
export class BookModule {}
