import { Field, InputType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class AddCompaniesToExperienceDto {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
  @Field(() => [String])
  companies?: Schema.Types.ObjectId[];
}
