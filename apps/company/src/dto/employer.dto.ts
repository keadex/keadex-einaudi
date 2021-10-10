import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateEmployerDto {
  @Field()
  from: string;
  @Field({ nullable: true })
  to?: string;
  @Field(() => String)
  company: Schema.Types.ObjectId;
}

@InputType()
export class AdditionalEmployerInfo {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}

@InputType()
export class UpdateEmployerDto extends IntersectionType(
  PartialType(CreateEmployerDto),
  AdditionalEmployerInfo,
) {}

@InputType()
export class ListEmployersDto extends IntersectionType(
  PartialType(CreateEmployerDto),
  AdditionalEmployerInfo,
) {}
