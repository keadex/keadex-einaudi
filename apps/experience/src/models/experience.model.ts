import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Task } from './task.model';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Sector } from './sector.model';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Experience {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  role: string;

  @Field()
  @Prop()
  from: string;

  @Field({ nullable: true })
  @Prop()
  to?: string;

  @Field({ nullable: true })
  @Prop()
  avatarFileName: string;

  @Field(() => [Task])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Task.name })
  tasks: MongooseSchema.Types.ObjectId[] | Task[];

  @Field(() => [Sector])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Sector.name })
  sectors: MongooseSchema.Types.ObjectId[] | Sector[];
}

export type ExperienceDocument = Experience & Document;

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
