import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
@Directive('@key(fields: "id")')
export class Task {
  @Field((type) => ID)
  @Prop()
  id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  key: string;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
