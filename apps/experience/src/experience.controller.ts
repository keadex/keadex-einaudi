import { Controller, Get } from '@nestjs/common';
import { ExperienceService } from './services/experience.service';

@Controller()
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  getHello(): string {
    return this.experienceService.getHello();
  }
}
