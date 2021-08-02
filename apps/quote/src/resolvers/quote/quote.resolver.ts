import { Resolver, Query, Context } from '@nestjs/graphql';
import { Quote } from '../../models/quote.model';
import { QuoteDataSources } from '../../models/datasources.model';
import { Quotes } from '../../models/quotes.model';

@Resolver(() => Quote)
export class QuoteResolver {
  @Query(() => [Quote], { name: 'randomQuotes' })
  async getRandomQuotes(@Context('dataSources') dataSources: QuoteDataSources) {
    const quotes: Quotes = await dataSources.quotesAPI.getRandomQuotes();
    return quotes.results;
  }
}
