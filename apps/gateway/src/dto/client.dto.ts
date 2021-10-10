import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateClientDto {
  @Field()
  email: string;
  @Field(() => [String])
  roles?: Schema.Types.ObjectId[];
}

@InputType()
export class AdditionalClientInfo {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}

@InputType()
export class UpdateClientDto extends IntersectionType(
  PartialType(CreateClientDto),
  AdditionalClientInfo,
) {}

@InputType()
export class ListClientDto extends IntersectionType(
  PartialType(CreateClientDto),
  AdditionalClientInfo,
) {}
