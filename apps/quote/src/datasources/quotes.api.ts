import { RESTDataSource } from 'apollo-datasource-rest';
import { Quotes } from '../models/quotes.model';

//Thanks to https://github.com/lukePeavey/quotable
export class QuotesAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://api.quotable.io/';
  }

  async getRandomQuotes() {
    const quotes: Quotes = await this.get(`quotes`);
    const randomPage: number =
      Math.floor(Math.random() * quotes.totalPages) + 1;
    return this.get(`quotes?page=${randomPage}`);
  }

  // async getMostViewedMovies(limit = 10) {
  //   const data = await this.get('movies', {
  //     // Query parameters
  //     per_page: limit,
  //     order_by: 'most_viewed',
  //   });
  //   return data.results;
  // }
}
