import { Resolver, Query, Context } from '@nestjs/graphql';
import { Quote } from '../../models/quote.model';
import { QuoteDataSources } from '../../models/datasources.model';
import { Quotes } from '../../models/quotes.model';
import { Roles, RoleType, JwtAuthGuard } from '@keadex/corelib';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Quote)
export class QuoteResolver {
  @Query(() => [Quote], { name: 'randomQuotes' })
  @Roles(RoleType.GUEST)
  @UseGuards(JwtAuthGuard)
  async getRandomQuotes(@Context('dataSources') dataSources: QuoteDataSources) {
    const quotes: Quotes = await dataSources.quotesAPI.getRandomQuotes();
    return quotes.results;
  }
}
