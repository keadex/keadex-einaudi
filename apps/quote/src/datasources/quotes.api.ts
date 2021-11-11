import { RESTDataSource } from 'apollo-datasource-rest';
import { Quotes } from '../models/quotes.model';

//Thanks to https://github.com/lukePeavey/quotable
export class QuotesAPI extends RESTDataSource {
  constructor() {
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
}
