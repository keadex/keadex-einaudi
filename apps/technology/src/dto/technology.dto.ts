import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateTechnologyDto {
  @Field()
  name: string;
}

@InputType()
export class AdditionalTechnologyInfo {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}

@InputType()
export class UpdateTechnologyDto extends IntersectionType(
  PartialType(CreateTechnologyDto),
  AdditionalTechnologyInfo,
) {}

@InputType()
export class ListTechnologiesDto extends IntersectionType(
  PartialType(CreateTechnologyDto),
  AdditionalTechnologyInfo,
) {}
