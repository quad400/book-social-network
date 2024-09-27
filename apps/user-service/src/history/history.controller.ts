import { Controller, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from '@app/common';
import { User } from '../user/model/user.model';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}


  @ApiOperation({description: "Borrow Book"})
  @Post("/borrow-book/:bookId")
  async borrowBook(@CurrentUser() user: User, @Param("bookId") bookId: string){
    return await this.historyService.borrowBook(user.pk, bookId)
  }

}
