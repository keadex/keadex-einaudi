import { Test, TestingModule } from '@nestjs/testing';
import { SectorResolver } from './sector.resolver';

describe('SectorResolver', () => {
  let resolver: SectorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectorResolver],
    }).compile();

    resolver = module.get<SectorResolver>(SectorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
