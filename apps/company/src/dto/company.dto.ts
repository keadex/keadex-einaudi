import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateCompanyDto {
  @Field()
  name: string;
  @Field()
  city: string;
  @Field()
  country: string;
  @Field()
  logoFilename: string;
}

@InputType()
export class AdditionalCompanyInfo {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}

@InputType()
export class UpdateCompanyDto extends IntersectionType(
  PartialType(CreateCompanyDto),
  AdditionalCompanyInfo,
) {}

@InputType()
export class ListCompaniesDto extends IntersectionType(
  PartialType(CreateCompanyDto),
  AdditionalCompanyInfo,
) {}
