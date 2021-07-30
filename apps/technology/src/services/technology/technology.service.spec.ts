import { Test, TestingModule } from '@nestjs/testing';
import { TechnologyService } from './technology.service';

describe('TechnologyService', () => {
  let service: TechnologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnologyService],
    }).compile();

    service = module.get<TechnologyService>(TechnologyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
