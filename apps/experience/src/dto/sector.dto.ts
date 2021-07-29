import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateSectorDto {
  @Field()
  key: string;
}

@InputType()
export class AdditionalSectorInfo {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}

@InputType()
export class UpdateSectorDto extends IntersectionType(
  PartialType(CreateSectorDto),
  AdditionalSectorInfo,
) {}

@InputType()
export class ListSectorDto extends IntersectionType(
  PartialType(CreateSectorDto),
  AdditionalSectorInfo,
) {}
