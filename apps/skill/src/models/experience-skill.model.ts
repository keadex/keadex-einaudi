import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Skill } from './skill.model';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class ExperienceSkill {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  usagePercentage: number;

  @Field(() => Skill, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Skill.name })
  skill?: MongooseSchema.Types.ObjectId | Skill;
}

export type ExperienceSkillDocument = ExperienceSkill & Document;

export const ExperienceSkillSchema =
  SchemaFactory.createForClass(ExperienceSkill);
