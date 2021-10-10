import { Field, InputType } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { CreateExperienceSkillDto } from './experience-skill.dto';

export class CreateExperienceDto {
  _id: Schema.Types.ObjectId;
}

@InputType()
export class AddSkillsToExperienceDto {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
  @Field(() => [CreateExperienceSkillDto])
  skills?: CreateExperienceSkillDto[];
}
