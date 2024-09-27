import { Injectable } from '@nestjs/common';
import { BookRepository } from './respository/book.repository';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { UserRepository } from '../user/repository/user.repository';
import { BaseResponse } from '@app/common';
import { BusinessCode } from '@app/common/enum';
import { QueryDto } from '@app/common';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createBook(userId: string, data: CreateBookDto) {
    const user = await this.userRepository.findById(userId);
    await this.bookRepository.checkUnique(data, 'title');
    const book = await this.bookRepository.create({ ...data, owner: user });
    await book.save();
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Book Successfully created',
    });
  }

  async updateBook(userId: string, bookId: string, data: UpdateBookDto) {
    await this.bookRepository.checkUnique(data, 'title');

    await this.bookRepository.findOneAndUpdate(
      { 'owner.pk': userId, pk: bookId },
      data,
    );

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Book Successfully Updated',
    });
  }

  async getBook(bookId: string) {
    const book = await this.bookRepository.findById(bookId);
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Book Successfully retrieved',
      data: book,
    });
  }

  async getBooks(query: QueryDto) {
    const books = await this.bookRepository.findPaginated({ query });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Book Successfully retrieved',
      data: books,
    });
  }

  async getMyBooks(query: QueryDto, userId: string) {
    const books = await this.bookRepository.findPaginated({
      query,
      filterQuery: { 'owner.pk': userId },
    });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Book Successfully retrieved',
      data: books,
    });
  }

  async getDeletedBooks(query: QueryDto, userId: string) {
    const books = await this.bookRepository.findPaginated({
      query,
      filterQuery: { 'owner.pk': userId, is_deleted: true },
    });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Book Successfully retrieved',
      data: books,
    });
  }

  async deleteBook(userId: string, bookId: string) {
    await this.bookRepository.softDelete({ 'owner.pk': userId, pk: bookId });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Book Successfully deleted',
    });
  }

  async deleteBookPermanently(userId: string, bookId: string) {
    await this.bookRepository.delete({ 'owner.pk': userId});
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Book Successfully deleted permanently',
    });
  }

  async restoreBook(userId: string, bookId: string) {
    await this.bookRepository.restore({ 'owner.pk': userId, pk: bookId });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Book Successfully Restored',
    });
  }

  async toggleArchievedBook(userId: string, bookId: string) {
    const book = await this.bookRepository.findOne({
      'owner.pk': userId,
      pk: bookId,
    });

    if (book.achieved) {
      await this.bookRepository.findOneAndUpdate(
        { 'owner.pk': userId, pk: bookId },
        { achieved: false },
      );
      return BaseResponse.success({
        businessCode: BusinessCode.OK,
        businessDescription: 'Book Successfully UnArchieved Activated',
      });
    } else {
      await this.bookRepository.findOneAndUpdate(
        { 'owner.pk': userId, pk: bookId },
        { achieved: true },
      );

      return BaseResponse.success({
        businessCode: BusinessCode.OK,
        businessDescription: 'Book Successfully Archieved Activated',
      });
    }
  }

  async toggleShareableBook(userId: string, bookId: string) {
    const book = await this.bookRepository.findOne({
      'owner.pk': userId,
      pk: bookId,
    });

    if (book.shareable) {
      await this.bookRepository.findOneAndUpdate(
        { 'owner.pk': userId, pk: bookId },
        { shareable: false },
      );
      return BaseResponse.success({
        businessCode: BusinessCode.OK,
        businessDescription: 'Book Successfully UnShareable Activated',
      });
    } else {
      await this.bookRepository.findOneAndUpdate(
        { 'owner.pk': userId, pk: bookId },
        { shareable: true },
      );

      return BaseResponse.success({
        businessCode: BusinessCode.OK,
        businessDescription: 'Book Successfully Shareable Activated',
      });
    }
  }
}
