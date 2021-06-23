import { ObjectType, Directive, Field } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Company {
  @Field(() => String)
  _id: string;

  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  logoFilename: string;
}
