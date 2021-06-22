import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from './company.model';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "_id")')
export class Experience {
  @Field(() => String)
  @Directive('@external')
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [Company])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Company.name })
  companies: MongooseSchema.Types.ObjectId[] | Company[];
}

export type ExperienceDocument = Experience & Document;

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
