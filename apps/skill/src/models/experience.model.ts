import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  ExperienceSkill,
  ExperienceSkillSchema,
} from './experience-skill.model';

@Schema()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "_id")')
export class Experience {
  @Field(() => String)
  @Directive('@external')
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [ExperienceSkill], { nullable: true })
  @Prop({ type: [ExperienceSkillSchema] })
  skills?: ExperienceSkill[];
}

export type ExperienceDocument = Experience & Document;

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
