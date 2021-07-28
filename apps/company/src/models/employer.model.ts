import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Company } from './company.model';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Employer {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  from: string;

  @Field({ nullable: true })
  @Prop()
  to?: string;

  @Field(() => Company, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Company.name })
  company?: MongooseSchema.Types.ObjectId | Company;
}

export type EmployerDocument = Employer & Document;

export const EmployerSchema = SchemaFactory.createForClass(Employer);
