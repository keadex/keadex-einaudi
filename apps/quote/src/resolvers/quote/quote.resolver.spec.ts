import { Test, TestingModule } from '@nestjs/testing';
import { QuoteResolver } from './quote.resolver';

describe('QuoteResolver', () => {
  let resolver: QuoteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteResolver],
    }).compile();

    resolver = module.get<QuoteResolver>(QuoteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
