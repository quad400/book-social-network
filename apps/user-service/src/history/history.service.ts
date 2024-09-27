import { Injectable, NotFoundException } from '@nestjs/common';
import { HistoryRepository } from './repository/history.repository';
import { BookRepository } from '../book/respository/book.repository';
import { UserRepository } from '../user/repository/user.repository';
import { BaseResponse } from '@app/common';
import { BusinessCode } from '@app/common/enum';

@Injectable()
export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly bookRepository: BookRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async borrowBook(userId: string, bookId: string) {
    const user = await this.userRepository.findOne({ pk: userId });
    const book = await this.bookRepository.findOne(
      { pk: bookId, shareable: true, achieved: false },
      true,
    );

    if (!book) {
      throw new NotFoundException(
        'The book you are trying to borrow is not available at the momment',
      );
    }

    await this.historyRepository.create({ user, book });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User successfully borrow book',
    });
  }
}
