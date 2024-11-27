import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Expose()
  _id: string;

  @Prop({ required: true })
  @Expose()
  firstName: string;

  @Prop({ required: true })
  @Expose()
  lastName: string;

  @Prop({ required: true, unique: true })
  @Expose()
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({
    enum: ['admin', 'user'],
    required: true,
  })
  @Expose()
  role: string;

  @Prop()
  @Exclude()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
