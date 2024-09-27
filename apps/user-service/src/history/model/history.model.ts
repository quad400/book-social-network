import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/model/user.model';
import { AbstractDocument } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class History extends AbstractDocument{
  @Prop({ type: User, required: true })
  borrower: User;

  @Prop({ type: Types.ObjectId, ref: "Book", required: true })
  book: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  retured: boolean;

  @Prop({ type: Boolean, default: false })
  return_approved: boolean;

  @Prop({type: String, default: null})
  returned_condition: string
}

export const HistorySchema = SchemaFactory.createForClass(History);
