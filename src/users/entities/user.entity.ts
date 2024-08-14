import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from './../../common/database/abstract.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
@ObjectType()
export class User extends AbstractEntity {
  @Prop()
  @Field() // This makes the field available in the GraphQL schema
  email: string;

  @Prop()
  @Field()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
