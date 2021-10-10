import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class CreateTaskDto {
  @Field()
  key: string;
}

@InputType()
export class AdditionalTaskInfo {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}

@InputType()
export class UpdateTaskDto extends IntersectionType(
  PartialType(CreateTaskDto),
  AdditionalTaskInfo,
) {}

@InputType()
export class ListTaskDto extends IntersectionType(
  PartialType(CreateTaskDto),
  AdditionalTaskInfo,
) {}
