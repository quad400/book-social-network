import { AbstractDocument } from '@app/common';
import { UserRole } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { extend } from 'joi';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractDocument {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  full_name: string;

  @Prop({ type: String, select: false })
  password: string;

  @Prop({ type: Boolean, default: false })
  is_verified: boolean;

  @Prop({ enum: UserRole, default: UserRole.READER })
  role: string;

  @Prop({
    type: String,
    default:
      'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg',
  })
  avatar: string;

  @Prop({ type: [{ type: Types.UUID, ref: 'Book' }], default: [] })
  books: Types.UUID[];

  @Prop({ type: String })
  token: string;

  @Prop({ type: Date })
  token_expiry_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
