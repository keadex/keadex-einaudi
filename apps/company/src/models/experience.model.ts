import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Company } from './company.model';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "_id")')
export class Experience {
  @Field(() => String)
  @Directive('@external')
  _id: string;

  @Field(() => [Company])
  companies: string[] | Company[];
}
