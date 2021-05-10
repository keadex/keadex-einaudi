import { IntersectionType, PartialType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

export class CreateTaskDto {
  key: string;
}

export class AdditionalTaskInfo {
  _id: Schema.Types.ObjectId;
}

export class UpdateTaskDto extends IntersectionType(
  PartialType(CreateTaskDto),
  AdditionalTaskInfo,
) {}

export class ListTaskDto extends IntersectionType(
  PartialType(CreateTaskDto),
  AdditionalTaskInfo,
) {}
