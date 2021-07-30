import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Technology {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  name: string;
}

export type TechnologyDocument = Technology & Document;

export const TechnologySchema = SchemaFactory.createForClass(Technology);
