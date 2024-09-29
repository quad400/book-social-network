import { BaseResponse, QueryDto, QueryWithoutSearchDto } from '@app/common';
import { AddFeedbackDto } from '../dto/feedback.dto';
import { FeedbackRepository } from '../respository/feedback.repository';
import { BusinessCode } from '@app/common/enum';
import { HistoryRepository } from '../../history/repository/history.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly historyRepository: HistoryRepository,
  ) {}

  async addFeedback(userId: string, data: AddFeedbackDto) {
    const { bookId, rate, comment } = data;

    const history = await this.historyRepository.findOne(
      { book: bookId, borrower: userId },
      true,
    );

    if (!history) {
      throw new BadRequestException(
        'You have to borrow and read this book for you to give feedback',
      );
    }

    await this.feedbackRepository.create({
      user: userId,
      book: bookId,
      rate,
      comment,
    });
    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'Feedback Successfully Added',
    });
  }

  async updateFeedback(
    feedbackId: string,
    data: AddFeedbackDto,
    userId: string,
  ) {
    await this.feedbackRepository.findOneAndUpdate(
      { _id: feedbackId, user: userId },
      data,
    );

    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'Feedback Successfully Updated',
    });
  }

  async getFeedback(feedbackId: string) {
    const feedback = await (
      await (
        await this.feedbackRepository.findById(feedbackId)
      ).populate({
        path: 'user',
        select: 'username email profile',
      })
    ).populate({
      path: 'book',
      select: 'title book_cover author synopsis isbn genre shareable achieved',
    });

    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'Feedback Successfully Retrieved',
      data: feedback,
    });
  }

  async getFeedbacks(query: QueryWithoutSearchDto, bookId: string) {
    const feedbacks = await this.feedbackRepository.findPaginated({
      query,
      filterQuery: { book: bookId },
    });

    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'Feedbacks Successfully Retrieved',
      data: feedbacks,
    });
  }
}
