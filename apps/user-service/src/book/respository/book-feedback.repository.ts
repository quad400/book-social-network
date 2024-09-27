import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { BookFeedback } from '../model/book-feedback.model';

@Injectable()
export class BookFeedbackRepository extends AbstractRepository<BookFeedback> {
  protected readonly logger = new Logger(BookFeedbackRepository.name);

  constructor(
    @InjectModel(BookFeedback.name) bookFeedbackModel: Model<BookFeedback>,
    @InjectConnection() connection: Connection,
  ) {
    super(bookFeedbackModel, connection);
  }
}
