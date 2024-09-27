import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './respository/book.repository';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  controllers: [BookController],
  providers: [BookService, BookRepository, UserRepository],
})
export class BookModule {}
