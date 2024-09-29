import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, QueryDto, QueryWithoutSearchDto } from '@app/common';
import { User } from '../user/model/user.model';
import { ApproveReturnedBookDto } from './dto/history.dto';

@ApiTags('History')
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @ApiOperation({ description: 'Borrow Book' })
  @Post('/borrow-book/:bookId')
  async borrowBook(@CurrentUser() user: User, @Param('bookId') bookId: string) {
    return await this.historyService.borrowBook(user._id, bookId);
  }

  @ApiOperation({ description: 'Get Borrowed Books' })
  @ApiQuery({
    name: 'page',
    description: 'Page Number',
    required: false,
    schema: { default: 1 },
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit Number',
    required: false,
    schema: { default: 10 },
  })
  @ApiQuery({
    name: 'sortField',
    description: 'Field to sort',
    required: false,
  })
  @ApiQuery({
    name: 'sortDirection',
    description: 'Direction To Sort ASC | DESC',
    required: false,
  })
  @Get('get-borrowed-books')
  async getBorrowedBooks(@Query() query: QueryWithoutSearchDto, @CurrentUser() user: User) {
    return await this.historyService.getBorrowedBooks(user._id, query);
  }

  @Get('get-borrowed-book/:borrowedBookId')
  async getBorrowedBook(@Param('borrowedBookId') borrowedBookId: string) {
    return await this.historyService.getBorrowedBook(borrowedBookId);
  }

  @Put('return-borrowed-book/:borrowedBookId')
  async returnBorrowedBook(
    @Param('borrowedBookId') borrowedBookId: string,
    @CurrentUser() user: User,
  ) {
    return await this.historyService.returnBorrowedBook(
      borrowedBookId,
      user._id,
    );
  }

  @Put('approve-borrowed-book/:borrowedBookId')
  async approveReturnedBook(
    @Param('borrowedBookId') borrowedBookId: string,
    @CurrentUser() user: User,
    @Body() data: ApproveReturnedBookDto,
  ) {
    return await this.historyService.approveReturnedBook(
      borrowedBookId,
      user._id,
      data,
    );
  }

  @ApiOperation({ description: 'Get Lend Books' })
  @ApiQuery({
    name: 'page',
    description: 'Page Number',
    required: false,
    schema: { default: 1 },
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit Number',
    required: false,
    schema: { default: 10 },
  })
  @ApiQuery({
    name: 'sortField',
    description: 'Field to sort',
    required: false,
  })
  @ApiQuery({
    name: 'sortDirection',
    description: 'Direction To Sort ASC | DESC',
    required: false,
  })
  @Get('get-lend-books')
  async getLendBooks(@Query() query: QueryWithoutSearchDto, @CurrentUser() user: User) {
    return await this.historyService.getLendBooks(query, user._id);
  }
}
