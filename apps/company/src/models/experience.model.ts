import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from './company.model';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Employer } from './employer.model';

@Schema()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "_id")')
export class Experience {
  @Field(() => String)
  @Directive('@external')
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [Employer], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Employer.name })
  employers?: MongooseSchema.Types.ObjectId[] | Employer[];

  @Field(() => [Company], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Company.name })
  customers?: MongooseSchema.Types.ObjectId[] | Company[];
}

export type ExperienceDocument = Experience & Document;

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
