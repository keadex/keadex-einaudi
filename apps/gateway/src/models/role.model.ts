import {
  ObjectType,
  Directive,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { RoleType } from '@keadex/corelib';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Role {
  @Field(() => String)
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => RoleType)
  @Prop({ type: RoleType, unique: true })
  name: RoleType;
}

export type RoleDocument = Role & Document;

export const RoleSchema = SchemaFactory.createForClass(Role);

registerEnumType(RoleType, {
  name: 'RoleType',
  description: "The supported client's roles.",
});
