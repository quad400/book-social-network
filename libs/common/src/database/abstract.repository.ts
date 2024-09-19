import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
import {
  Connection,
  Document,
  FilterQuery,
  IfAny,
  Model,
  Require_id,
  Types,
  UpdateQuery,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import Paginator from '../utils/paginate';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  // Unique check method
  async checkUnique(
    data: Record<string, any>,
    uniqueField: string,
  ): Promise<boolean> {
    const entity = await this.model.findOne({
      [uniqueField]: data[uniqueField],
      is_deleted: false,
    });

    if (entity) {
      throw new ConflictException(
        `${this.model.collection.collectionName
          .toUpperCase()
          .slice(
            0,
            -1,
          )} with ${uniqueField} "${data[uniqueField]}" already exists.`,
      );
    }
    return true;
  }

  async create({
    document,
    uniqueField,
    uniqueFieldCheck = true,
  }: {
    document: Record<string, any>;
    uniqueField?: string;
    uniqueFieldCheck?: boolean;
  }): Promise<TDocument> {
    if (uniqueFieldCheck) {
      await this.checkUnique(document, uniqueField);
    }
    const createdDocument = new this.model({
      ...document,
      _id: new Types.UUID(),
    });
    return await createdDocument.save();
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {
      is_deleted: false,
    })


    if (!document) {
      throw new NotFoundException(
        `${this.model.collection.collectionName
          .toUpperCase()
          .slice(0, -1)} not found.`,
      );
    }

    return document;
  }

  async findById(id: string): Promise<TDocument> {
    const document = await this.model.findById(id, {
      is_deleted: false,
    })


    if (!document) {
      throw new NotFoundException(
        `${this.model.collection.collectionName
          .toUpperCase()
          .slice(0, -1)} not found.`,
      );
    }

    return document;
  }

  async findOneWithPassword(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery, { is_deleted: false })
      .select('password');

    if (!document) {
      throw new NotFoundException(
        `${this.model.collection.collectionName
          .toUpperCase()
          .slice(0, -1)} not found.`,
      );
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(
      { ...filterQuery, is_deleted: false },
      update,
      {
        lean: true,
        new: true,
      },
    );

    if (!document) {
      throw new NotFoundException(
        `${this.model.collection.collectionName
          .toUpperCase()
          .slice(0, -1)} not found.`,
      );
    }

    return document;
  }

  async find({
    filterQuery,
    paginated = true,
  }: {
    filterQuery: FilterQuery<TDocument>;
    paginated: boolean;
  }) {
    let document: any;

    if (paginated) {
      document = new Paginator(
        this.model.find({ is_deleted: false }, { lean: true }),
        filterQuery,
      );

      document
        .search()
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .paginateResult();
    } else {
      document = this.model.find({ is_deleted: false });
    }

    return document;
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
