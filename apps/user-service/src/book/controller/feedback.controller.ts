import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FeedbackService } from '../service/feedback.service';
import { CurrentUser, QueryDto, QueryWithoutSearchDto } from '@app/common';
import { User } from '../../user/model/user.model';
import { AddFeedbackDto } from '../dto/feedback.dto';

@ApiTags('Feedback')
@ApiBearerAuth()
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({description: "Add New Feedback"})
  @Post('add-feedback')
  async addFeedback(@CurrentUser() user: User, @Body() data: AddFeedbackDto) {
    return await this.feedbackService.addFeedback(user._id, data);
  }
  
  @ApiOperation({description: "Update Feedback"})
  @Patch('update-feedback/:feedbackId')
  async updateFeedback(
    @CurrentUser() user: User,
    @Param('feedbackId') feedbackId: string,
    @Body() data: AddFeedbackDto,
  ) {
    return await this.feedbackService.updateFeedback(
      feedbackId,
      data,
      user._id,
    );
  }
  
  @ApiOperation({description: "Get Feedback By Id"})
  @Get('get-feedback/:feedbackId')
  async getFeedback(@Param('feedbackId') feedbackId: string) {
    return await this.feedbackService.getFeedback(feedbackId);
  }

  @ApiOperation({ description: 'Get Feedbacks' })
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
  @Get('get-feedbacks/:bookId')
  async getFeedbacks(
    @Query() query: QueryWithoutSearchDto,
    @Param('bookId') bookId: string,
  ) {
    return await this.feedbackService.getFeedbacks(query, bookId);
  }
}