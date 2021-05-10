import { IntersectionType, PartialType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

export class CreateExperienceDto {
  role: string;
  from: string;
  to?: string;
  avatarFileName: string;
  tasks?: Schema.Types.ObjectId[];
}

export class AdditionalExperienceInfo {
  _id: Schema.Types.ObjectId;
}

export class UpdateExperienceDto extends IntersectionType(
  PartialType(CreateExperienceDto),
  AdditionalExperienceInfo,
) {}

export class ListExperienceDto extends IntersectionType(
  PartialType(CreateExperienceDto),
  AdditionalExperienceInfo,
) {}
