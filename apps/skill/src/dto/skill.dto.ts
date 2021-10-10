import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateSkillDto {
  @Field()
  name: string;
}

@InputType()
export class AdditionalSkillInfo {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}

@InputType()
export class UpdateSkillDto extends IntersectionType(
  PartialType(CreateSkillDto),
  AdditionalSkillInfo,
) {}

@InputType()
export class ListSkillsDto extends IntersectionType(
  PartialType(CreateSkillDto),
  AdditionalSkillInfo,
) {}
