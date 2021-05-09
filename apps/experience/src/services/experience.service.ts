import { Injectable } from '@nestjs/common';

@Injectable()
export class ExperienceService {
  findById(id: number): import('../models/experience.model').Experience {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
