import { Test, TestingModule } from '@nestjs/testing';
import { EmployerResolver } from './employer.resolver';

describe('EmployerResolver', () => {
  let resolver: EmployerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployerResolver],
    }).compile();

    resolver = module.get<EmployerResolver>(EmployerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
