import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

describe('ExperienceController', () => {
  let experienceController: ExperienceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExperienceController],
      providers: [ExperienceService],
    }).compile();

    experienceController = app.get<ExperienceController>(ExperienceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(experienceController.getHello()).toBe('Hello World!');
    });
  });
});
