import { AbstractDocument } from '@app/common';
import { BookEnum } from '@app/common/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/model/user.model';


@Schema({ versionKey: false, timestamps: true,strict:false })
export class Book extends AbstractDocument {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  book_cover: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: String })
  synopsis: string;

  @Prop({ type: String })
  isbn: string;

  @Prop({ enum: BookEnum, required: true })
  genre: string;

  @Prop({ type: Boolean, default: true })
  shareable: boolean;

  @Prop({ type: Boolean, default: false })
  achieved: boolean;

  @Prop({type: User, required: true})
  owner: User

}

export const BookSchema = SchemaFactory.createForClass(Book);
