import { Field, InputType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

export class CreateExperienceDto {
  _id: Schema.Types.ObjectId;
}

@InputType()
export class AddEmployersToExperienceDto {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
  @Field(() => [String])
  employers?: Schema.Types.ObjectId[];
}
