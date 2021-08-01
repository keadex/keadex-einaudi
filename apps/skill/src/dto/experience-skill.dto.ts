import { Field, InputType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateExperienceSkillDto {
  @Field()
  usagePercentage: number;
  @Field(() => String)
  skill: Schema.Types.ObjectId;
}
