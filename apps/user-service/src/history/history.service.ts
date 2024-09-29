import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HistoryRepository } from './repository/history.repository';
import { BookRepository } from '../book/respository/book.repository';
import { UserRepository } from '../user/repository/user.repository';
import { BaseResponse, QueryDto } from '@app/common';
import { BusinessCode } from '@app/common/enum';
import { ApproveReturnedBookDto } from './dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly bookRepository: BookRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async borrowBook(userId: string, bookId: string) {
    const user = await this.userRepository.findOne({ _id: userId });
    const book = await this.bookRepository.findOne(
      { _id: bookId, shareable: true, achieved: false },
      true,
    );

    if (!book) {
      throw new NotFoundException(
        'The book you are trying to borrow is not available at the momment',
      );
    }

    if (book.owner._id === userId) {
      throw new BadRequestException('You cannot borrow the book you own');
    }

    await this.historyRepository.create({ borrower: user._id, book: book._id });
    book.shareable = false;
    await book.save();

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User successfully borrow book',
    });
  }

  async getBorrowedBooks(userId: string, query: QueryDto) {
    const borrowedBooks = await this.historyRepository.findPaginated({
      query,
      filterQuery: { borrower: userId },
    });

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User successfully Retrieved borrow books',
      data: borrowedBooks,
    });
  }

  async getBorrowedBook(borrowedBookId: string) {
    const borrowedBook = await (
      await (
        await this.historyRepository.findById(borrowedBookId)
      ).populate({
        path: 'borrower',
        select: 'username email profile',
      })
    ).populate({
      path: 'book',
      select: 'title book_cover author synopsis isbn genre shareable achieved',
    });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User successfully retrieved borrow book',
      data: borrowedBook,
    });
  }

  async returnBorrowedBook(borrowedBookId: string, userId: string) {
    const borrowedBook = await this.historyRepository.findOneAndUpdate(
      { _id: borrowedBookId, borrower: userId },
      { retured: true },
    );
    await this.bookRepository.findOneAndUpdate(
      { _id: borrowedBook.book },
      { shareable: true },
    );

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User successfully return borrow book',
    });
  }

  async approveReturnedBook(
    borrowedBookId: string,
    userId: string,
    data: ApproveReturnedBookDto,
  ) {
    const borrowedBook = await this.historyRepository.findOne({
      _id: borrowedBookId,
    });
    const book = await this.bookRepository.findOne(
      { _id: borrowedBook.book, 'owner._id': userId },
      true,
    );

    if (!book) {
      throw new NotFoundException("You cannot approve book you don't own");
    }

    borrowedBook.return_approved = true;
    borrowedBook.returned_condition = data.condition;

    await borrowedBook.save();

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User successfully return borrow book',
    });
  }

  async getLendBooks(query: QueryDto, userId: string) {
    const books = await this.bookRepository.find({
      filterQuery: { 'owner._id': userId },
    });

    const results = await Promise.all(
      books.map(async (book) => {
        const historys = await this.historyRepository.findPaginated({
          query,
          filterQuery: { book: book._id },
        });
        return {
          historys,
        };
      }),
    );

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User successfully retrieved lend books',
      data: results,
    });
  }
}
