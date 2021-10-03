import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateRoleDto {
  @Field()
  name: string;
}

@InputType()
export class AdditionalRoleInfo {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}

@InputType()
export class UpdateRoleDto extends IntersectionType(
  PartialType(CreateRoleDto),
  AdditionalRoleInfo,
) {}

@InputType()
export class ListRoleDto extends IntersectionType(
  PartialType(CreateRoleDto),
  AdditionalRoleInfo,
) {}
