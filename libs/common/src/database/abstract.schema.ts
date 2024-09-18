import { Prop, Schema } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument extends Document{
  @Prop({ type: Types.UUID })
  _id: Types.UUID;

  @Prop({ default: false })
  is_deleted: boolean;
}
