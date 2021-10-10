import { ObjectType, Directive, Field } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Quote {
  @Field()
  _id: string;

  // The quotation text
  @Field()
  content: string;

  // The full name of the author
  @Field()
  author: string;

  // The `slug` of the quote author
  @Field()
  authorSlug: string;

  // The length of quote (number of characters)
  @Field()
  length: number;

  // An array of tag names for this quote
  @Field(() => [String])
  tags: string[];
}
