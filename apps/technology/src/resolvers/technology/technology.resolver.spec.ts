import { Test, TestingModule } from '@nestjs/testing';
import { TechnologyResolver } from './technology.resolver';

describe('TechnologyResolver', () => {
  let resolver: TechnologyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnologyResolver],
    }).compile();

    resolver = module.get<TechnologyResolver>(TechnologyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
