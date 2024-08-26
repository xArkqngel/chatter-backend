import { ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from './../../common/database/abstract.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
@ObjectType()
export class UserDocument extends AbstractEntity {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
