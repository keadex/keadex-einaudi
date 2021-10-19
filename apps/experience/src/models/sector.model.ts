import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Sector {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ unique: true })
  key: string;
}

export type SectorDocument = Sector & Document;

export const SectorSchema = SchemaFactory.createForClass(Sector);
