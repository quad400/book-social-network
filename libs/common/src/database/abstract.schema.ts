import { Prop, Schema } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';


@Schema()
export class AbstractDocument extends Document{
  @Prop({type: String})
  pk: string

  @Prop({type: Boolean, default: false})
  is_deleted: boolean
}
