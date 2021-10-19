import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Company {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ unique: true })
  name: string;

  @Field()
  @Prop()
  city: string;

  @Field()
  @Prop()
  country: string;

  @Field()
  @Prop()
  logoFilename: string;
}

export type CompanyDocument = Company & Document;

export const CompanySchema = SchemaFactory.createForClass(Company);
