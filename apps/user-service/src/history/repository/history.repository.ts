import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { History } from '../model/history.model';

@Injectable()
export class HistoryRepository extends AbstractRepository<History> {
  protected readonly logger = new Logger(HistoryRepository.name);

  constructor(
    @InjectModel(History.name) historyModel: Model<History>,
    @InjectConnection() connection: Connection,
  ) {
    super(historyModel, connection);
  }
}
