import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Quote } from './quote.model';

@ObjectType()
@Directive('@key(fields: "page")')
export class Quotes {
  // The number of quotes returned in this response
  @Field()
  count: number;

  // The total number of quotes matching this query
  @Field()
  totalCount: number;

  // The current page number
  @Field()
  page: number;

  // The total number of pages matching this request
  @Field()
  totalPages: number;

  // The 1-based index of the last result included in the current response.
  @Field()
  lastItemIndex: number;

  // The array of quotes
  @Field(() => [Quote])
  results: Quote[];
}
