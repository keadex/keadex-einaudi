import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Role {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  name: string;
}

export type RoleDocument = Role & Document;

export const RoleSchema = SchemaFactory.createForClass(Role);
