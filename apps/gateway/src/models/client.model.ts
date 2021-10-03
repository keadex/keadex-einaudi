import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from './role.model';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Client {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  apiKey: string;

  @Field()
  @Prop()
  email: string;

  @Field({ nullable: true })
  @Prop()
  accessToken?: string;

  @Field(() => [Role])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Role.name })
  roles: MongooseSchema.Types.ObjectId[] | Role[];
}

export type ClientDocument = Client & Document;

export const ClientSchema = SchemaFactory.createForClass(Client);
