import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { HistoryRepository } from './repository/history.repository';
import { BookRepository } from '../book/respository/book.repository';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  controllers: [HistoryController],
  providers: [
    HistoryService,
    HistoryRepository,
    BookRepository,
    UserRepository,
  ],
})
export class HistoryModule {}
