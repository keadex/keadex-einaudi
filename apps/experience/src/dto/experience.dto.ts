import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateExperienceDto {
  @Field()
  role: string;
  @Field()
  from: string;
  @Field()
  to?: string;
  @Field()
  avatarFileName: string;
  @Field(() => [String])
  tasks?: Schema.Types.ObjectId[];
}

@InputType()
export class AdditionalExperienceInfo {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}

@InputType()
export class UpdateExperienceDto extends IntersectionType(
  PartialType(CreateExperienceDto),
  AdditionalExperienceInfo,
) {}

@InputType()
export class ListExperienceDto extends IntersectionType(
  PartialType(CreateExperienceDto),
  AdditionalExperienceInfo,
) {}
